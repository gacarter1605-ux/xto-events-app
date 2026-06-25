export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzeEpNtYw3FsD4dQ1bHcuN4Keb3Udom71fsCxx2MdD13o_oMuqX_gkoclvpQLF1j0myaw/exec';

    if (req.method === 'GET') {
      const r = await fetch(SCRIPT_URL, {
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json'
        }
      });
      const text = await r.text();
      const data = JSON.parse(text);
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      let body = '';
      for await (const chunk of req) body += chunk;
      const r = await fetch(SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
          'User-Agent': 'Mozilla/5.0'
        },
        body
      });
      const data = await r.json();
      return res.status(200).json(data);
    }

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
