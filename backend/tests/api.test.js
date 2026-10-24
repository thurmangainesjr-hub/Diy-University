import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, api, registerLearner } from './helpers.js';

let server;
let request;

before(async () => {
  server = await startServer();
  request = api(server.baseUrl);
});

after(() => server.close());

test('health check answers', async () => {
  const res = await request('GET', '/health');
  assert.equal(res.status, 200);
  assert.equal(res.json.status, 'healthy');
});

test('schools and courses are listed', async () => {
  const schools = await request('GET', '/api/schools');
  assert.equal(schools.status, 200);
  assert.ok(schools.json.data.length > 0);

  const courses = await request('GET', '/api/courses');
  assert.equal(courses.status, 200);
  assert.ok(courses.json.data.some(c => c.id === 'story-fundamentals'));
});

test('courses can be filtered by school', async () => {
  const res = await request('GET', '/api/courses?school=writing');
  assert.equal(res.status, 200);
  assert.ok(res.json.data.length > 0);
  assert.ok(res.json.data.every(c => c.school === 'writing'));
});

test('an unknown course is a 404', async () => {
  const res = await request('GET', '/api/courses/no-such-course');
  assert.equal(res.status, 404);
});

test('register needs a name, email and password', async () => {
  const res = await request('POST', '/api/auth/register', { body: { email: 'x@example.com' } });
  assert.equal(res.status, 400);
});

test('the same email cannot register twice', async () => {
  const learner = await registerLearner(request);
  const res = await request('POST', '/api/auth/register', {
    body: { name: 'Again', email: learner.email, password: 'Password123!' }
  });
  assert.equal(res.status, 400);
});

test('login works with the right password and fails with the wrong one', async () => {
  const learner = await registerLearner(request);

  const ok = await request('POST', '/api/auth/login', {
    body: { email: learner.email, password: learner.password }
  });
  assert.equal(ok.status, 200, ok.text);
  assert.ok(ok.json.data.token);

  const bad = await request('POST', '/api/auth/login', {
    body: { email: learner.email, password: 'WrongPassword1!' }
  });
  assert.equal(bad.status, 401);
});

test('a signed-in learner can see their own profile', async () => {
  const learner = await registerLearner(request);
  const res = await request('GET', '/api/auth/me', { token: learner.token });
  assert.equal(res.status, 200, res.text);
  assert.equal(res.json.data.email ?? res.json.data.user?.email, learner.email);
});

test('protected routes need a valid token', async () => {
  const none = await request('GET', '/api/progress');
  assert.equal(none.status, 401);

  const forged = await request('GET', '/api/progress', { token: 'not-a-real-token' });
  assert.equal(forged.status, 401);
});

test('two learners who sign up at once stay separate', async () => {
  const [a, b] = await Promise.all([registerLearner(request), registerLearner(request)]);
  assert.notEqual(a.user.id, b.user.id);

  const enrolled = await request('POST', '/api/courses/ai-prompts/enroll', { token: a.token });
  assert.equal(enrolled.status, 200, enrolled.text);

  const bCourses = await request('GET', '/api/courses?enrolled=true', { token: b.token });
  assert.equal(bCourses.json.data.length, 0);
});

test('a learner can enroll, track progress, and not enroll twice', async () => {
  const learner = await registerLearner(request);

  const enrolled = await request('POST', '/api/courses/story-fundamentals/enroll', { token: learner.token });
  assert.equal(enrolled.status, 200, enrolled.text);

  const again = await request('POST', '/api/courses/story-fundamentals/enroll', { token: learner.token });
  assert.equal(again.status, 400);

  const mine = await request('GET', '/api/courses?enrolled=true', { token: learner.token });
  assert.deepEqual(mine.json.data.map(c => c.id), ['story-fundamentals']);

  const updated = await request('PUT', '/api/courses/story-fundamentals/progress', {
    token: learner.token,
    body: { lessonId: 'lesson-1', progress: 40 }
  });
  assert.equal(updated.status, 200, updated.text);

  const course = await request('GET', '/api/courses/story-fundamentals', { token: learner.token });
  assert.equal(course.json.data.enrolled, true);
  assert.equal(course.json.data.progress, 40);

  const summary = await request('GET', '/api/progress', { token: learner.token });
  assert.equal(summary.json.data.enrolledCourses, 1);
});

test('progress needs an enrollment and a number from 0 to 100', async () => {
  const learner = await registerLearner(request);

  const notEnrolled = await request('PUT', '/api/courses/business-launch/progress', {
    token: learner.token,
    body: { lessonId: 'lesson-1', progress: 10 }
  });
  assert.equal(notEnrolled.status, 400);

  await request('POST', '/api/courses/business-launch/enroll', { token: learner.token });
  const tooHigh = await request('PUT', '/api/courses/business-launch/progress', {
    token: learner.token,
    body: { lessonId: 'lesson-1', progress: 150 }
  });
  assert.equal(tooHigh.status, 400);
});

test('enrolling in an unknown course is a 404', async () => {
  const learner = await registerLearner(request);
  const res = await request('POST', '/api/courses/no-such-course/enroll', { token: learner.token });
  assert.equal(res.status, 404);
});
