$csharpSource = @"
using System;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Drawing.Text;

public class ApiLogoEnhancer
{
    public static void EnhanceApiLogo(string inputPath, string outputPath)
    {
        using (Bitmap raw = new Bitmap(inputPath))
        {
            // Find content bounds in raw image (Y < 215 for top graphics)
            int minX = raw.Width, maxX = 0, minY = raw.Height, maxY = 0;
            for (int y = 0; y < 215; y++)
            {
                for (int x = 0; x < raw.Width; x++)
                {
                    Color c = raw.GetPixel(x, y);
                    if (c.R < 235 || c.G < 235 || c.B < 235)
                    {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            // Create a high-res target bitmap (1200 x 500)
            int targetW = 1200;
            int targetH = 500;
            using (Bitmap dst = new Bitmap(targetW, targetH, PixelFormat.Format32bppArgb))
            using (Graphics g = Graphics.FromImage(dst))
            {
                g.SmoothingMode = SmoothingMode.HighQuality;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;

                // Crop and scale top graphic
                int topContentW = maxX - minX;
                int topContentH = maxY - minY;
                
                // Scale top graphic to fill width (approx 1160px wide)
                float scale = (float)(targetW - 60) / topContentW;
                int scaledTopH = (int)(topContentH * scale);
                int destY = 20;

                // Draw top graphics onto transparent canvas with bright white text & original api logo colors
                for (int sy = minY; sy <= maxY; sy++)
                {
                    for (int sx = minX; sx <= maxX; sx++)
                    {
                        Color c = raw.GetPixel(sx, sy);
                        if (c.R < 235 || c.G < 235 || c.B < 235)
                        {
                            bool isGrey = (c.R > 40 && c.G > 40 && c.B > 40 && Math.Abs(c.R - c.G) < 25 && Math.Abs(c.G - c.B) < 25);
                            Color outColor;
                            if (isGrey)
                            {
                                int brightness = 255 - ((c.R + c.G + c.B) / 3);
                                int alpha = Math.Min(255, Math.Max(0, (int)(brightness * 1.6) + 60));
                                outColor = Color.FromArgb(alpha, 255, 255, 255);
                            }
                            else
                            {
                                outColor = Color.FromArgb(255, c.R, c.G, c.B);
                            }

                            // Calculate mapped rect in target
                            int dx = 30 + (int)((sx - minX) * scale);
                            int dy = destY + (int)((sy - minY) * scale);
                            int dw = (int)Math.Ceiling(scale);
                            int dh = (int)Math.Ceiling(scale);

                            using (SolidBrush b = new SolidBrush(outColor))
                            {
                                g.FillRectangle(b, dx, dy, dw, dh);
                            }
                        }
                    }
                }

                // Draw bottom text: "Agent immobiliari / A10750" in huge, ultra-sharp bold font
                using (Font font = new Font("Segoe UI", 58, FontStyle.Bold, GraphicsUnit.Pixel))
                using (SolidBrush brush = new SolidBrush(Color.White))
                using (StringFormat sf = new StringFormat())
                {
                    sf.Alignment = StringAlignment.Center;
                    sf.LineAlignment = StringAlignment.Center;
                    g.DrawString("Agent immobiliari / A10750", font, brush, new RectangleF(0, destY + scaledTopH + 25, targetW, 110), sf);
                }

                dst.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharpSource -ReferencedAssemblies "System.Drawing.dll"
$badgesPath = (Resolve-Path "public\images\badges").Path
[ApiLogoEnhancer]::EnhanceApiLogo(
    (Join-Path $badgesPath "logo-api.jpg"),
    (Join-Path $badgesPath "logo-api.png")
)
Write-Host "API LOGO ENHANCED & ENLARGED!"
