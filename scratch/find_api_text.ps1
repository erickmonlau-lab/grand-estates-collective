Add-Type -AssemblyName System.Drawing

$apiBmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\images\badges\logo-api.jpg"))
Write-Host "Width: $($apiBmp.Width), Height: $($apiBmp.Height)"

# Let's find non-white pixels near bottom (Y > 230)
$minY = 349
$maxY = 0
$minX = 1024
$maxX = 0

for ($y = 230; $y -lt $apiBmp.Height; $y++) {
    for ($x = 0; $x -lt $apiBmp.Width; $x++) {
        $c = $apiBmp.GetPixel($x, $y)
        # If not near white (r, g, b < 240)
        if ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240) {
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
        }
    }
}

Write-Host "Bottom text bounds: X from $minX to $maxX, Y from $minY to $maxY"
$apiBmp.Dispose()
