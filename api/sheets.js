export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const URL = 'https://script.google.com/macros/s/AKfycbzeEpNtYw3FsD4dQ1bHcuN4Keb3Udom71fsCxx2MdD13o_oMuqX_gkoclvpQLF1j0myaw/exec';
    
    const response = await fetch(URL, {
      redirect: 'follow',
      headers: { 'Accept': 'application/json' }
    });

    const text = await response.text();
    
    // Try to parse as JSON, otherwise return raw text for debugging
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch(parseErr) {
      // Return raw response so we can see what Google sent back
      res.status(200).send('RAW RESPONSE: ' + text.substring(0, 500));
    }

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
