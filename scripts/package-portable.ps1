$src = "C:\Users\31475\Desktop\英语学习助手"
$dst = "C:\Users\31475\Desktop\english-helper-portable"
$zip = "C:\Users\31475\Desktop\english-helper-portable.zip"

if (Test-Path $zip) { Remove-Item $zip -Force }
if (Test-Path $dst) { Remove-Item -Recurse -Force $dst }

New-Item -ItemType Directory -Path $dst -Force | Out-Null

Copy-Item (Join-Path $src "dist") -Recurse -Destination (Join-Path $dst "dist")
Copy-Item (Join-Path $src "eh-server.exe") -Destination $dst
Copy-Item (Join-Path $src "eh-server.cs") -Destination $dst
Copy-Item (Join-Path $src "portable-run.bat") -Destination $dst

Compress-Archive -Path (Join-Path $dst "*") -DestinationPath $zip -Force

Remove-Item -Recurse -Force $dst

$size = (Get-Item $zip).Length
Write-Host ("Done: " + $zip + " (" + $size + " bytes)")
