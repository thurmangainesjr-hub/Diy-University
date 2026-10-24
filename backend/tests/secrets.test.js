import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadAuth(env) {
  return spawnSync(process.execPath, ['-e', "import('./middleware/auth.js')"], {
    cwd: backendDir,
    env: { PATH: process.env.PATH, ...env },
    encoding: 'utf8'
  });
}

test('in production a missing JWT_SECRET stops the server', () => {
  const res = loadAuth({ NODE_ENV: 'production' });
  assert.notEqual(res.status, 0);
  assert.match(res.stderr, /JWT_SECRET must be set in production/);
});

test('in production a set JWT_SECRET is accepted', () => {
  const res = loadAuth({ NODE_ENV: 'production', JWT_SECRET: 'set' });
  assert.equal(res.status, 0, res.stderr);
});
