# Run from: mindbridge\mindbridge folder
#   cd C:\Users\sumar\OneDrive\Desktop\MindBridge\mindbridge\mindbridge
#   .\scripts\reset-github-clean.ps1

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoRoot

Write-Host ""
Write-Host "=== MindBridge: clean Git repo (no node_modules) ===" -ForegroundColor Cyan
Write-Host "Repo folder: $repoRoot"
Write-Host ""

$pkg = Join-Path -Path $repoRoot -ChildPath "package.json"
if (-not (Test-Path -LiteralPath $pkg)) {
    Write-Error "No package.json in this folder. Use the Next.js app folder that contains scripts\reset-github-clean.ps1"
    exit 1
}

$gitDir = Join-Path -Path $repoRoot -ChildPath ".git"
if (Test-Path -LiteralPath $gitDir) {
    Remove-Item -LiteralPath $gitDir -Recurse -Force
    Write-Host "Removed .git" -ForegroundColor Yellow
}

$gi = Join-Path -Path $repoRoot -ChildPath ".gitignore"
$lines = @(
    "node_modules/",
    "**/node_modules/",
    ".next/",
    ".env.local"
)
if (-not (Test-Path -LiteralPath $gi)) {
    Set-Content -LiteralPath $gi -Value ($lines -join [Environment]::NewLine) -Encoding utf8
    Write-Host "Created .gitignore" -ForegroundColor Green
}
else {
    $raw = Get-Content -LiteralPath $gi -Raw -ErrorAction SilentlyContinue
    if ($null -eq $raw) { $raw = "" }
    foreach ($line in $lines) {
        $key = $line.Replace("/", "")
        if ($raw -notlike "*$key*") {
            Add-Content -LiteralPath $gi -Value $line -Encoding utf8
            Write-Host "Appended to .gitignore: $line" -ForegroundColor Green
        }
    }
}

git init
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git branch -M main
git add .

$staged = @(git diff --cached --name-only 2>$null)
$bad = @()
foreach ($p in $staged) {
    if ($p -match "node_modules") {
        $bad += $p
    }
}
if ($bad.Count -gt 0) {
    Write-Host ""
    Write-Error ("node_modules is still staged. Remove .git and fix .gitignore. Bad paths: " + ($bad -join "; "))
    exit 1
}

Write-Host ""
Write-Host "OK: no node_modules in the index." -ForegroundColor Green
Write-Host "First 25 staged paths:"
$staged | Select-Object -First 25

Write-Host ""
Write-Host "=== Next commands (copy/paste) ===" -ForegroundColor Cyan
Write-Host 'git remote remove origin 2>$null'
Write-Host 'git remote add origin https://github.com/SumaReddy369/mindbridge.git'
Write-Host 'git commit -m "Initial commit: MindBridge (no node_modules)"'
Write-Host 'git push -u origin main --force'
Write-Host ""
