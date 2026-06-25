export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzeEpNtYw3FsD4dQ1bHcuN4Keb3Udom71fsCxx2MdD13o_oMuqX_gkoclvpQLF1j0myaw/exec';

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
    };

    // Manually follow every redirect until we get JSON
    let currentUrl = SCRIPT_URL;
    let response;

    for (let i = 0; i < 6; i++) {
      response = await fetch(currentUrl, { redirect: 'manual', headers });
      const location = response.headers.get('location');
      if (!location) break;
      currentUrl = location.startsWith('http') ? location : 'https://script.google.com' + location;
    }

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch(e) {
      // Show final URL and first 500 chars so we can debug
      return res.status(200).send(`FINAL URL: ${currentUrl} || TEXT: ${text.substring(0, 500)}`);
    }

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
