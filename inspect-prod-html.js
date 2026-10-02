import https from 'https';
import zlib from 'zlib';

https.get('https://gesgrama.com/', (res) => {
  const chunks = [];
  res.on('data', chunk => chunks.push(chunk));
  res.on('end', () => {
    const rawBuffer = Buffer.concat(chunks);
    console.log('HTTP Status:', res.statusCode);
    console.log('Content-Encoding:', res.headers['content-encoding'] || 'none');
    console.log('Raw transfer bytes:', rawBuffer.length);

    let html = rawBuffer.toString('utf8');
    console.log('Uncompressed HTML length:', html.length, 'chars/bytes');

    const gzip = zlib.gzipSync(rawBuffer);
    const brotli = zlib.brotliCompressSync(rawBuffer);
    console.log('Gzip compressed size:', gzip.length, 'bytes');
    console.log('Brotli compressed size:', brotli.length, 'bytes');

    const styleTags = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    console.log('\nTotal inline <style> tags:', styleTags.length);
    let totalInlineCssBytes = 0;
    styleTags.forEach((s, idx) => {
      console.log(`Style tag ${idx + 1} size: ${s.length} bytes`);
      totalInlineCssBytes += s.length;
    });
    console.log('Total inline CSS bytes:', totalInlineCssBytes);

    const linkStylesheets = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
    console.log('\nExternal <link rel="stylesheet"> count:', linkStylesheets.length);
    linkStylesheets.forEach(l => console.log('Link:', l));

    const preloadCss = html.match(/<link[^>]*as=["']style["'][^>]*>/gi) || [];
    console.log('Preload style count:', preloadCss.length);
    preloadCss.forEach(p => console.log('Preload CSS:', p));

    const scriptTags = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
    console.log('\nTotal <script> tags:', scriptTags.length);
  });
});
