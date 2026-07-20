# English Learning Assistant - Portable HTTP Server
param([int]$Port = 5173)

$root = Join-Path $PSScriptRoot "dist"
$idxFile = Join-Path $root "index.html"

if (!(Test-Path $idxFile)) {
    Write-Host "Error: dist\index.html not found" -ForegroundColor Red
    pause
    exit 1
}

$server = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $Port)
try {
    $server.Start()
} catch {
    Write-Host "Error: Port $Port is in use. Close other programs and try again." -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "English Learning Assistant started" -ForegroundColor Green
Write-Host "  http://localhost:$Port" -ForegroundColor White
Write-Host "Close this window to stop the server" -ForegroundColor Gray
Write-Host ""

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$buf = New-Object byte[] 8192
$crlf = "`r`n"

while ($true) {
    try {
        $client = $server.AcceptTcpClient()
        $stream = $client.GetStream()
        $n = $stream.Read($buf, 0, $buf.Length)
        if ($n -le 0) { $client.Close(); continue }

        $req = [System.Text.Encoding]::UTF8.GetString($buf, 0, $n)
        $lines = $req -split "`r`n|`n"
        $firstLine = $lines[0] -split ' '
        $urlPath = if ($firstLine.Length -gt 1) { $firstLine[1] } else { "/" }

        # URL decode
        $urlPath = [System.Uri]::UnescapeDataString($urlPath)
        # Strip query string
        $qidx = $urlPath.IndexOf('?')
        if ($qidx -ge 0) { $urlPath = $urlPath.Substring(0, $qidx) }

        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        $filePath = Join-Path $root $urlPath
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

        if ((Test-Path $filePath) -and !(Test-Path $filePath -PathType Container)) {
            $body = [System.IO.File]::ReadAllBytes($filePath)
            $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
            $header = "HTTP/1.1 200 OK$crlf" +
                      "Content-Type: $contentType$crlf" +
                      "Content-Length: $($body.Length)$crlf" +
                      "Connection: close$crlf$crlf"
        } else {
            # SPA fallback
            $body = [System.IO.File]::ReadAllBytes($idxFile)
            $header = "HTTP/1.1 200 OK$crlf" +
                      "Content-Type: text/html; charset=utf-8$crlf" +
                      "Content-Length: $($body.Length)$crlf" +
                      "Connection: close$crlf$crlf"
        }

        $hdrBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
        $stream.Write($hdrBytes, 0, $hdrBytes.Length)
        $stream.Write($body, 0, $body.Length)
        $stream.Close()
        $client.Close()
    } catch {
        # Client disconnected, continue
    }
}
