# Run from: mindbridge/mindbridge
# Fixes "Compiling forever" / never "Ready" when the project lives under OneDrive / Dropbox / network drives.

$env:CHOKIDAR_USEPOLLING = "true"
$env:WATCHPACK_POLLING = "true"
$env:NEXT_TELEMETRY_DISABLED = "1"

Write-Host "MindBridge dev (Turbopack + polling — best on OneDrive)..." -ForegroundColor Cyan
npx next dev -p 3000 --turbo
