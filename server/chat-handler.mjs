const MAX_MESSAGE_LENGTH = 1200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

const rateLimitStore = new Map();

const systemPrompt = "You are Ayoub Bahrouni's portfolio Copilot. Only answer questions about Ayoub, his projects, skills, education, experience, resume, and contact info. Be concise. Do not invent facts. If information is missing, say it is not listed in the portfolio.";

const sendJson = (res, statusCode, body) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const readJsonBody = (req) => new Promise((resolve, reject) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 20_000) {
      reject(new Error('Request body too large'));
      req.destroy();
    }
  });

  req.on('end', () => {
    try {
      resolve(body ? JSON.parse(body) : {});
    } catch {
      reject(new Error('Invalid JSON'));
    }
  });

  req.on('error', reject);
});

const getClientId = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
};

const isRateLimited = (clientId) => {
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (!entry || now - entry.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientId, { count: 1, startedAt: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
};

export const handleChatRequest = async (req, res, options = {}) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (isRateLimited(getClientId(req))) {
    sendJson(res, 429, { error: 'Too many messages. Please wait a minute and try again.' });
    return;
  }

  const apiKey = options.apiKey || process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === 'your_new_openrouter_key_here') {
    sendJson(res, 500, { error: 'OpenRouter API key is not configured.' });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!message) {
    sendJson(res, 400, { error: 'Message is required.' });
    return;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    sendJson(res, 400, { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less.` });
    return;
  }

  try {
    const referer = options.referer || process.env.PORTFOLIO_URL || req.headers.origin || 'http://localhost:8080';
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-OpenRouter-Title': 'Ayoub Portfolio',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = typeof data.error?.message === 'string'
        ? data.error.message
        : 'OpenRouter request failed.';
      sendJson(res, response.status, { error });
      return;
    }

    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) {
      sendJson(res, 502, { error: 'OpenRouter returned an empty response.' });
      return;
    }

    sendJson(res, 200, { reply: reply.trim() });
  } catch {
    sendJson(res, 502, { error: 'Unable to reach OpenRouter. Please try again.' });
  }
};
