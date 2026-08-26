Add-Type -AssemblyName System.Drawing

# 1. PROCESS LOGO API: Replace "Real estate" with "A10750" and create transparent PNG version
$apiSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\images\badges\logo-api.jpg"))
$apiOut = New-Object System.Drawing.Bitmap($apiSrc.Width, $apiSrc.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gApi = [System.Drawing.Graphics]::FromImage($apiOut)
$gApi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gApi.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# First, copy pixels from src, making pure/near white (R>245, G>245, B>245) transparent, and replacing dark grey text (Y>220) with white/bright text
# We will clear the bottom area (Y > 210) completely and redraw "Agent immobiliari / A10750" in crisp typography

for ($y = 0; $y -lt $apiSrc.Height; $y++) {
    for ($x = 0; $x -lt $apiSrc.Width; $x++) {
        if ($y -lt 220) {
            $c = $apiSrc.GetPixel($x, $y)
            # If background white/near white
            if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
                $apiOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                # Check if it's the grey text on top ("Membre de:", "Col·legis...") -> make it bright white for dark footer
                if ($c.R -gt 80 -and $c.G -gt 80 -and $c.B -gt 80 -and [Math]::Abs($c.R - $c.G) -lt 25 -and [Math]::Abs($c.G - $c.B) -lt 25) {
                    # Dark grey text -> turn into crisp light text with original alpha
                    $brightness = 255 - (($c.R + $c.G + $c.B) / 3)
                    $alpha = [Math]::Min(255, [Math]::Max(0, [int]($brightness * 1.5)))
                    $apiOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
                } else {
                    # Keep the original blue & yellow api logo colors
                    $apiOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
                }
            }
        } else {
            # Transparent for bottom area to be redrawn
            $apiOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

# Now draw "Agent immobiliari / A10750" centered at the bottom in the exact matching typography
$font = New-Object System.Drawing.Font("Arial", 42, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 255, 255, 255))
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

$rect = New-Object System.Drawing.RectangleF(0, 225, $apiOut.Width, 110)
$gApi.DrawString("Agent immobiliari / A10750", $font, $brush, $rect, $sf)

$apiOut.Save((Resolve-Path "public\images\badges").Path + "\logo-api-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Also create a light version just in case
$apiOutLight = New-Object System.Drawing.Bitmap($apiSrc.Width, $apiSrc.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gApiLight = [System.Drawing.Graphics]::FromImage($apiOutLight)
$gApiLight.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gApiLight.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

for ($y = 0; $y -lt $apiSrc.Height; $y++) {
    for ($x = 0; $x -lt $apiSrc.Width; $x++) {
        if ($y -lt 220) {
            $c = $apiSrc.GetPixel($x, $y)
            if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
                $apiOutLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $apiOutLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
            }
        } else {
            $apiOutLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}
$brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 90, 90, 90))
$gApiLight.DrawString("Agent immobiliari / A10750", $font, $brushDark, $rect, $sf)
$apiOutLight.Save((Resolve-Path "public\images\badges").Path + "\logo-api.png", [System.Drawing.Imaging.ImageFormat]::Png)

$apiSrc.Dispose()
$apiOut.Dispose()
$apiOutLight.Dispose()
$gApi.Dispose()
$gApiLight.Dispose()


# 2. PROCESS PJI ESCUDO: Make outer white transparent
$pjiSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\images\badges\logo-pji-escudo.jpg"))
$pjiOut = New-Object System.Drawing.Bitmap($pjiSrc.Width, $pjiSrc.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Flood fill outer background with transparency
# We can find background pixels starting from corners
$visited = New-Object 'bool[,]' $pjiSrc.Width, $pjiSrc.Height
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Add boundary points
for ($x = 0; $x -lt $pjiSrc.Width; $x++) {
    $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
    $queue.Enqueue((New-Object System.Drawing.Point($x, $pjiSrc.Height - 1)))
}
for ($y = 0; $y -lt $pjiSrc.Height; $y++) {
    $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
    $queue.Enqueue((New-Object System.Drawing.Point($pjiSrc.Width - 1, $y)))
}

while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $x = $pt.X
    $y = $pt.Y
    if ($x -lt 0 -or $x -ge $pjiSrc.Width -or $y -lt 0 -or $y -ge $pjiSrc.Height) { continue }
    if ($visited[$x, $y]) { continue }
    $visited[$x, $y] = $true

    $c = $pjiSrc.GetPixel($x, $y)
    # If white/near white (R>230, G>230, B>230)
    if ($c.R -gt 230 -and $c.G -gt 230 -and $c.B -gt 230) {
        $queue.Enqueue((New-Object System.Drawing.Point($x + 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x - 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y + 1)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y - 1)))
    }
}

for ($y = 0; $y -lt $pjiSrc.Height; $y++) {
    for ($x = 0; $x -lt $pjiSrc.Width; $x++) {
        if ($visited[$x, $y]) {
            $pjiOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $c = $pjiSrc.GetPixel($x, $y)
            $pjiOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
        }
    }
}

$pjiOut.Save((Resolve-Path "public\images\badges").Path + "\logo-pji-escudo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$pjiSrc.Dispose()
$pjiOut.Dispose()


# 3. PROCESS APIS-PERITOS: Make background transparent, and make dark text/shapes pop cleanly
$apSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\images\badges\logo-apis-peritos.jpg"))
$apOut = New-Object System.Drawing.Bitmap($apSrc.Width, $apSrc.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $apSrc.Height; $y++) {
    for ($x = 0; $x -lt $apSrc.Width; $x++) {
        $c = $apSrc.GetPixel($x, $y)
        # Background is white
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            $apOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # If text "APIS - PERITOS" (Y between 430 and 550, dark pixels) -> make bright white for dark footer
            if ($y -gt 420 -and $y -lt 550 -and $c.R -lt 100 -and $c.G -lt 100 -and $c.B -lt 100) {
                $apOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
            } else {
                $apOut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
            }
        }
    }
}
$apOut.Save((Resolve-Path "public\images\badges").Path + "\logo-apis-peritos.png", [System.Drawing.Imaging.ImageFormat]::Png)
$apSrc.Dispose()
$apOut.Dispose()

# 4. PROCESS AICAT: create transparent / rounded clean PNG
$aicatSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\images\badges\logo-aicat.jpg"))
$aicatOut = New-Object System.Drawing.Bitmap($aicatSrc.Width, $aicatSrc.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gAicat = [System.Drawing.Graphics]::FromImage($aicatOut)
$gAicat.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Draw rounded rectangle or crisp copy
$gAicat.DrawImage($aicatSrc, 0, 0, $aicatSrc.Width, $aicatSrc.Height)
$aicatOut.Save((Resolve-Path "public\images\badges").Path + "\logo-aicat.png", [System.Drawing.Imaging.ImageFormat]::Png)
$aicatSrc.Dispose()
$aicatOut.Dispose()
$gAicat.Dispose()

Write-Host "ALL BADGES PROCESSED SUCCESSFULLY!"
