export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzeEpNtYw3FsD4dQ1bHcuN4Keb3Udom71fsCxx2MdD13o_oMuqX_gkoclvpQLF1j0myaw/exec';

  const opts = { method: req.method, redirect: 'follow' };
  if (req.method === 'POST') {
    let body = '';
    for await (const chunk of req) body += chunk;
    opts.headers = { 'Content-Type': 'text/plain;charset=utf-8' };
    opts.body = body;
  }

  const upstream = await fetch(SCRIPT_URL, opts);
  const data = await upstream.json();
  res.status(200).json(data);
}
