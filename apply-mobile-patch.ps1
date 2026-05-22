# ==========================================================================
# Evolve Idle - Premium Mobile UI Automatic Patch Script
# Run this script whenever you update Evolve Idle files to re-apply the mobile layout!
# ==========================================================================

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      EVOLVE IDLE - PREMIUM MOBILE LAYOUT PATCHER         " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$IndexFile = Join-Path $PSScriptRoot "index.html"
$CssSource = Join-Path $PSScriptRoot "evolve/mobile-responsive.css"
$JsSource = Join-Path $PSScriptRoot "evolve/mobile-responsive.js"

# 1. Validation Checks
if (-not (Test-Path $IndexFile)) {
    Write-Error "Could not find index.html in the current directory!"
    Exit
}

if (-not (Test-Path $CssSource) -or -not (Test-Path $JsSource)) {
    Write-Error "Could not find mobile-responsive CSS/JS files under evolve/ directory!"
    Exit
}

Write-Host "Reading index.html..." -ForegroundColor Yellow
$HtmlContent = [System.IO.File]::ReadAllText($IndexFile, [System.Text.Encoding]::UTF8)

$Dirty = $false

# 2. Inject Mobile Stylesheet Load
$CssLoadTag = '<link rel="stylesheet" type="text/css" href="evolve/mobile-responsive.css">'
if ($HtmlContent -notlike "*$CssLoadTag*") {
    Write-Host "Injecting mobile-responsive CSS link into index.html..." -ForegroundColor Yellow
    $TargetCss = '<link rel="stylesheet" type="text/css" href="evolve/evolve.css">'
    $ReplacementCss = "$TargetCss`r`n    $CssLoadTag"
    $HtmlContent = $HtmlContent.Replace($TargetCss, $ReplacementCss)
    $Dirty = $true
} else {
    Write-Host "Mobile responsive CSS is already linked." -ForegroundColor Green
}

# 3. Inject Mobile JS Script Load
$JsLoadTag = '<script src="evolve/mobile-responsive.js" defer></script>'
if ($HtmlContent -notlike "*$JsLoadTag*") {
    Write-Host "Injecting mobile-responsive script tag into index.html..." -ForegroundColor Yellow
    $TargetJs = '<script src="evolve/main.js" type="module"></script>'
    $ReplacementJs = "$TargetJs`r`n    $JsLoadTag"
    $HtmlContent = $HtmlContent.Replace($TargetJs, $ReplacementJs)
    $Dirty = $true
} else {
    Write-Host "Mobile responsive JS is already loaded." -ForegroundColor Green
}

# 4. Save index.html back if modified
if ($Dirty) {
    Write-Host "Saving patched index.html..." -ForegroundColor Yellow
    [System.IO.File]::WriteAllText($IndexFile, $HtmlContent, [System.Text.Encoding]::UTF8)
    Write-Host "Successfully patched index.html!" -ForegroundColor Green
} else {
    Write-Host "index.html is already fully patched for mobile layout!" -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  SUCCESS: Mobile layout applied! Ready to run on mobile! " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
