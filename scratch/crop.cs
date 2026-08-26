using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

class Program {
    static void CropImage(string path) {
        string fullPath = Path.GetFullPath(path);
        if (!File.Exists(fullPath)) return;
        
        using (Bitmap bmp = new Bitmap(fullPath)) {
            int w = bmp.Width;
            int h = bmp.Height;
            int minX = w, minY = h, maxX = 0, maxY = 0;
            
            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    Color c = bmp.GetPixel(x, y);
                    if (c.R < 240 || c.G < 240 || c.B < 240) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            
            int pad = 20;
            minX = Math.Max(0, minX - pad);
            minY = Math.Max(0, minY - pad);
            int cropW = Math.Min(w - minX, (maxX - minX) + pad * 2);
            int cropH = Math.Min(h - minY, (maxY - minY) + pad * 2);
            
            if (cropW > 0 && cropH > 0 && (cropW < w || cropH < h)) {
                Rectangle rect = new Rectangle(minX, minY, cropW, cropH);
                using (Bitmap cropped = bmp.Clone(rect, bmp.PixelFormat)) {
                    string temp = fullPath + ".tmp.jpg";
                    cropped.Save(temp, ImageFormat.Jpeg);
                    bmp.Dispose();
                    File.Delete(fullPath);
                    File.Move(temp, fullPath);
                    Console.WriteLine(string.Format("Cropped {0} from {1}x{2} to {3}x{4}", Path.GetFileName(path), w, h, cropW, cropH));
                    return;
                }
            }
        }
    }

    static void Main() {
        CropImage("public/images/badges/logo-pji-escudo.jpg");
        CropImage("public/images/badges/logo-apis-peritos.jpg");
        CropImage("public/images/badges/logo-api.jpg");
        CropImage("public/images/badges/logo-aicat.jpg");
    }
}
