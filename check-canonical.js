import https from 'https';

function check() {
  const url = 'https://gesgrama.com/?_ts=' + Date.now();
  https.get(url, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const canonical = body.match(/<link[^>]*rel="canonical"[^>]*>/i);
      const ogUrl = body.match(/<meta[^>]*property="og:url"[^>]*>/i);
      const alternates = body.match(/<link[^>]*rel="alternate"[^>]*>/gi);
      console.log('Canonical:', canonical ? canonical[0] : 'None');
      console.log('OG URL:', ogUrl ? ogUrl[0] : 'None');
      console.log('Alternates:', alternates);
    });
  }).on('error', e => console.error(e));
}

check();
