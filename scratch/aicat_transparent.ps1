$csharpSource = @"
using System;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

public class AicatTransparent
{
    public static void MakeTransparent(string inputPath, string outputPath)
    {
        using (Bitmap src = new Bitmap(inputPath))
        using (Bitmap dst = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
        {
            for (int y = 0; y < src.Height; y++)
            {
                for (int x = 0; x < src.Width; x++)
                {
                    Color c = src.GetPixel(x, y);
                    // Blue background in aicat logo is approx R<20, G around 70-80, B around 130
                    // White text is R>200, G>200, B>200
                    if (c.R > 180 && c.G > 180 && c.B > 180)
                    {
                        dst.SetPixel(x, y, Color.FromArgb(255, 255, 255, 255));
                    }
                    else if (c.R > 100 && c.G > 120 && c.B > 150)
                    {
                        // Anti-aliased text edge
                        int alpha = Math.Min(255, (c.R + c.G + c.B) - 200);
                        dst.SetPixel(x, y, Color.FromArgb(Math.Max(0, alpha), 255, 255, 255));
                    }
                    else
                    {
                        // Blue background -> 100% transparent!
                        dst.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    }
                }
            }
            dst.Save(outputPath, ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $csharpSource -ReferencedAssemblies "System.Drawing.dll"
$badgesPath = (Resolve-Path "public\images\badges").Path
[AicatTransparent]::MakeTransparent(
    (Join-Path $badgesPath "logo-aicat.jpg"),
    (Join-Path $badgesPath "logo-aicat.png")
)
Write-Host "AICAT LOGO MADE 100% TRANSPARENT!"
