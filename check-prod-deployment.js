import https from 'https';

function checkProd() {
  const url = 'https://gesgrama.com/?_ts=' + Date.now();
  https.get(url, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const match = body.match(/family_barcelona_mobile_lcp-[A-Za-z0-9_-]+\.webp/);
      console.log('HTTP Status:', res.statusCode);
      console.log('Age header:', res.headers['age']);
      console.log('X-Vercel-Cache:', res.headers['x-vercel-cache']);
      console.log('Hero Mobile Asset:', match ? match[0] : 'Not found');
    });
  }).on('error', e => console.error(e));
}

checkProd();
