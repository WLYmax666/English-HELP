using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Collections.Generic;

class Program {
  static string GetMime(string ext) {
    switch (ext) {
      case ".html": return "text/html; charset=utf-8";
      case ".css":  return "text/css; charset=utf-8";
      case ".js":   return "application/javascript";
      case ".svg":  return "image/svg+xml";
      case ".png":  return "image/png";
      case ".ico":  return "image/x-icon";
      case ".json": return "application/json";
      default:      return "application/octet-stream";
    }
  }

  static void Main() {
    string root = Path.Combine(Environment.CurrentDirectory, "dist");
    string idxFile = Path.Combine(root, "index.html");

    if (!File.Exists(idxFile)) {
      Console.Error.WriteLine("Error: dist/index.html not found");
      Console.ReadKey();
      return;
    }

    TcpListener server = null;
    try {
      server = new TcpListener(IPAddress.Loopback, 5173);
      server.Start();
    } catch (Exception ex) {
      Console.Error.WriteLine("Error: " + ex.Message);
      Console.Error.WriteLine("Port 5173 may be in use. Try closing other programs.");
      Console.ReadKey();
      return;
    }

    Console.WriteLine("");
    Console.WriteLine("  English Learning Assistant started: http://localhost:5173");
    Console.WriteLine("  Close this window to stop the server");
    Console.WriteLine("");

    byte[] buf = new byte[8192];
    string rn = "\r\n";
    string serverHeader = "Server: eh-server/1.0" + rn;

    while (true) {
      try {
        TcpClient client = server.AcceptTcpClient();
        NetworkStream stream = client.GetStream();
        int nread = stream.Read(buf, 0, buf.Length);
        if (nread <= 0) { client.Close(); continue; }

        string request = Encoding.UTF8.GetString(buf, 0, nread);
        string[] lines = request.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None);
        if (lines.Length == 0) { client.Close(); continue; }

        // Parse "GET /path HTTP/1.1"
        string[] parts = lines[0].Split(' ');
        string method = parts.Length > 0 ? parts[0] : "";
        string urlPath = (parts.Length > 1 && parts[1].Length > 0) ? parts[1] : "/";

        // Decode URL percent-encoding
        urlPath = Uri.UnescapeDataString(urlPath);

        // Strip query string
        int qidx = urlPath.IndexOf('?');
        if (qidx >= 0) urlPath = urlPath.Substring(0, qidx);

        if (urlPath == "/") urlPath = "/index.html";
        if (urlPath.StartsWith("/")) urlPath = urlPath.Substring(1);

        string filePath = Path.Combine(root, urlPath);
        byte[] body;

        if (File.Exists(filePath)) {
          string ext = Path.GetExtension(filePath).ToLower();
          body = File.ReadAllBytes(filePath);
          string header = "HTTP/1.1 200 OK" + rn +
            serverHeader +
            "Content-Type: " + GetMime(ext) + rn +
            "Content-Length: " + body.Length + rn +
            "Connection: close" + rn +
            rn;
          byte[] hdr = Encoding.ASCII.GetBytes(header);
          stream.Write(hdr, 0, hdr.Length);
          stream.Write(body, 0, body.Length);
        } else {
          // SPA fallback
          body = File.ReadAllBytes(idxFile);
          string header = "HTTP/1.1 200 OK" + rn +
            serverHeader +
            "Content-Type: text/html; charset=utf-8" + rn +
            "Content-Length: " + body.Length + rn +
            "Connection: close" + rn +
            rn;
          byte[] hdr = Encoding.ASCII.GetBytes(header);
          stream.Write(hdr, 0, hdr.Length);
          stream.Write(body, 0, body.Length);
        }
        stream.Close();
        client.Close();
      } catch {
        // Client disconnected, continue
      }
    }
  }
}
