const SYSTEM_PROMPT =
  'Transcribe el nombre propio recibido a katakana japonés con la fonética correcta para nombres extranjeros. Separa nombre y apellido con ・. Responde ÚNICAMENTE con el katakana, sin explicaciones ni comillas.';

function respond502(res) {
  return res.status(502).json({ error: 'fallback' });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const nombre = typeof body?.nombre === 'string' ? body.nombre.trim() : '';
  if (!nombre || nombre.length > 60) {
    return res.status(400).json({ error: 'Invalid nombre' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return respond502(res);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 60,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: nombre }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return respond502(res);
    }

    const data = await response.json();
    const katakana = data.content?.find((block) => block.type === 'text')?.text?.trim();

    if (!katakana) {
      return respond502(res);
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ katakana });
  } catch {
    clearTimeout(timeoutId);
    return respond502(res);
  }
}
