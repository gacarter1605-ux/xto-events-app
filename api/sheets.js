export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzeEpNtYw3FsD4dQ1bHcuN4Keb3Udom71fsCxx2MdD13o_oMuqX_gkoclvpQLF1j0myaw/exec';

    if (req.method === 'GET') {
      const upstream = await fetch(SCRIPT_URL, { redirect: 'follow' });
      const data = await upstream.json();
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      const body = JSON.stringify(req.body);
      const upstream = await fetch(SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: body
      });
      const data = await upstream.json();
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
