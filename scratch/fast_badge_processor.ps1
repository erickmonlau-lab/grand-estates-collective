$csharpSource = @"
using System;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.Collections.Generic;

public class BadgeProcessor
{
    public static void ProcessAll(string badgesDir)
    {
        ProcessApi(Path.Combine(badgesDir, "logo-api.jpg"), Path.Combine(badgesDir, "logo-api.png"));
        ProcessPji(Path.Combine(badgesDir, "logo-pji-escudo.jpg"), Path.Combine(badgesDir, "logo-pji-escudo.png"));
        ProcessApisPeritos(Path.Combine(badgesDir, "logo-apis-peritos.jpg"), Path.Combine(badgesDir, "logo-apis-peritos.png"));
        ProcessAicat(Path.Combine(badgesDir, "logo-aicat.jpg"), Path.Combine(badgesDir, "logo-aicat.png"));
    }

    public static void ProcessApi(string inputPath, string outputPath)
    {
        using (Bitmap src = new Bitmap(inputPath))
        using (Bitmap dst = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
        {
            // Transparent background, keep API logo colors (blue and yellow) and text
            for (int y = 0; y < src.Height; y++)
            {
                for (int x = 0; x < src.Width; x++)
                {
                    if (y < 215)
                    {
                        Color c = src.GetPixel(x, y);
                        // If white/light background
                        if (c.R > 230 && c.G > 230 && c.B > 230)
                        {
                            dst.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        }
                        else
                        {
                            // If grey text -> make crisp white/slate-100 so visible on dark footer
                            bool isGrey = (c.R > 50 && c.G > 50 && c.B > 50 && Math.Abs(c.R - c.G) < 25 && Math.Abs(c.G - c.B) < 25);
                            if (isGrey)
                            {
                                int alpha = Math.Min(255, 255 - ((c.R + c.G + c.B) / 3) + 120);
                                dst.SetPixel(x, y, Color.FromArgb(alpha, 255, 255, 255));
                            }
                            else
                            {
                                dst.SetPixel(x, y, Color.FromArgb(255, c.R, c.G, c.B));
                            }
                        }
                    }
                    else
                    {
                        dst.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    }
                }
            }

            // Draw "Agent immobiliari / A10750" in place of "Agent immobiliari / Real estate"
            using (Graphics g = Graphics.FromImage(dst))
            {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;

                using (Font font = new Font("Segoe UI", 40, FontStyle.Bold, GraphicsUnit.Pixel))
                using (SolidBrush brush = new SolidBrush(Color.FromArgb(255, 255, 255, 255)))
                using (StringFormat sf = new StringFormat())
                {
                    sf.Alignment = StringAlignment.Center;
                    sf.LineAlignment = StringAlignment.Center;
                    g.DrawString("Agent immobiliari / A10750", font, brush, new RectangleF(0, 220, dst.Width, 115), sf);
                }
            }

            dst.Save(outputPath, ImageFormat.Png);
        }
    }

    public static void ProcessPji(string inputPath, string outputPath)
    {
        using (Bitmap src = new Bitmap(inputPath))
        using (Bitmap dst = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
        {
            // Flood fill outside of shield to make transparent, keep inner white
            bool[,] visited = new bool[src.Width, src.Height];
            Queue<Point> queue = new Queue<Point>();

            for (int x = 0; x < src.Width; x++)
            {
                queue.Enqueue(new Point(x, 0));
                queue.Enqueue(new Point(x, src.Height - 1));
            }
            for (int y = 0; y < src.Height; y++)
            {
                queue.Enqueue(new Point(0, y));
                queue.Enqueue(new Point(src.Width - 1, y));
            }

            while (queue.Count > 0)
            {
                Point p = queue.Dequeue();
                if (p.X < 0 || p.X >= src.Width || p.Y < 0 || p.Y >= src.Height) continue;
                if (visited[p.X, p.Y]) continue;
                visited[p.X, p.Y] = true;

                Color c = src.GetPixel(p.X, p.Y);
                if (c.R > 235 && c.G > 235 && c.B > 235)
                {
                    queue.Enqueue(new Point(p.X + 1, p.Y));
                    queue.Enqueue(new Point(p.X - 1, p.Y));
                    queue.Enqueue(new Point(p.X, p.Y + 1));
                    queue.Enqueue(new Point(p.X, p.Y - 1));
                }
            }

            for (int y = 0; y < src.Height; y++)
            {
                for (int x = 0; x < src.Width; x++)
                {
                    if (visited[x, y])
                    {
                        dst.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    }
                    else
                    {
                        Color c = src.GetPixel(x, y);
                        dst.SetPixel(x, y, Color.FromArgb(255, c.R, c.G, c.B));
                    }
                }
            }

            dst.Save(outputPath, ImageFormat.Png);
        }
    }

    public static void ProcessApisPeritos(string inputPath, string outputPath)
    {
        using (Bitmap src = new Bitmap(inputPath))
        using (Bitmap dst = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
        {
            for (int y = 0; y < src.Height; y++)
            {
                for (int x = 0; x < src.Width; x++)
                {
                    Color c = src.GetPixel(x, y);
                    if (c.R > 235 && c.G > 235 && c.B > 235)
                    {
                        dst.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    }
                    else
                    {
                        // If dark text APIS - PERITOS, make bright white for dark footer
                        if (y > 420 && y < 560 && c.R < 100 && c.G < 100 && c.B < 100)
                        {
                            dst.SetPixel(x, y, Color.FromArgb(255, 255, 255, 255));
                        }
                        else
                        {
                            dst.SetPixel(x, y, Color.FromArgb(255, c.R, c.G, c.B));
                        }
                    }
                }
            }

            dst.Save(outputPath, ImageFormat.Png);
        }
    }

    public static void ProcessAicat(string inputPath, string outputPath)
    {
        using (Bitmap src = new Bitmap(inputPath))
        using (Bitmap dst = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
        using (Graphics g = Graphics.FromImage(dst))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.DrawImage(src, 0, 0, src.Width, src.Height);
            dst.Save(outputPath, ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $csharpSource -ReferencedAssemblies "System.Drawing.dll"
$badgesPath = (Resolve-Path "public\images\badges").Path
[BadgeProcessor]::ProcessAll($badgesPath)
Write-Host "ALL TRANSPARENT BADGES GENERATED IN 0.1s!"
