/**
 * Test helpers
 *
 * Starts the API on a free port. Without MONGODB_URI it runs in demo mode
 * (users kept in memory); with it, the tests use that MongoDB.
 */

export async function startServer() {
  Object.assign(process.env, {
    NODE_ENV: 'test',
    JWT_SECRET: 'test-secret'
  });

  const { default: app, dbReady } = await import('../server.js');
  await dbReady;
  const server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  return {
    baseUrl,
    close: async () => {
      await new Promise(resolve => server.close(resolve));
      const { default: mongoose } = await import('mongoose');
      await mongoose.disconnect();
    }
  };
}

export function api(baseUrl) {
  return async function request(method, url, { body, token } = {}) {
    const res = await fetch(baseUrl + url, {
      method,
      headers: {
        ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
        ...(token ? { authorization: `Bearer ${token}` } : {})
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = undefined; }
    return { status: res.status, json, text };
  };
}

let counter = 0;

export async function registerLearner(request) {
  counter += 1;
  const email = `learner${counter}-${Date.now()}@example.com`;
  const password = 'Password123!';
  const res = await request('POST', '/api/auth/register', {
    body: { name: `Learner ${counter}`, email, password }
  });
  if (res.status !== 201) throw new Error(`register failed: ${res.status} ${res.text}`);
  return { email, password, ...res.json.data };
}
