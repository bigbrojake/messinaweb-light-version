import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../api/send-email.js';

const valid = { name: 'Jake Test', email: 'jakebmessina@gmail.com', intent: 'other', message: 'Contact protection verification. No business follow-up needed.', website: '' };
async function run(body = valid, options = {}) {
  const sent = [];
  const handler = createHandler({
    verifyBot: async () => options.verification ?? { isHuman: true, isBot: false, isVerifiedBot: false },
    sendEmail: async payload => {
      sent.push(payload);
      return options.sendResult?.(sent.length) ?? { data: { id: `test-${sent.length}` }, error: null };
    },
    ...options.dependencies,
  });
  const res = { code: 0, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(data) { this.data = data; return this; } };
  await handler({ method: options.method ?? 'POST', body, headers: {} }, res);
  return { res, sent };
}

test('all three inquiry types deliver notification and confirmation', async () => {
  for (const intent of ['other', 'client', 'consultant']) {
    const { res, sent } = await run({ ...valid, intent });
    assert.equal(res.code, 200);
    assert.equal(sent.length, 2);
    assert.equal(sent[0].to, 'recruiting@messina-llc.com');
    assert.equal(sent[0].cc, 'jakebmessina@gmail.com');
    assert.equal(sent[1].to, valid.email);
  }
});
test('unverified callers, bots, and verified crawlers cannot send mail', async () => {
  for (const verification of [{}, { isBot: true }, { isHuman: true, isVerifiedBot: true }]) {
    const { res, sent } = await run(valid, { verification });
    assert.equal(res.code, 403);
    assert.equal(sent.length, 0);
  }
});
test('verification outage fails closed', async () => {
  const { res, sent } = await run(valid, { dependencies: { verifyBot: async () => { throw new Error('offline'); } } });
  assert.equal(res.code, 503);
  assert.equal(sent.length, 0);
});
test('honeypot blocks before verification or delivery', async () => {
  const { res, sent } = await run({ ...valid, website: 'https://spam.example' }, { dependencies: { verifyBot: () => assert.fail('must not verify') } });
  assert.equal(res.code, 403);
  assert.equal(sent.length, 0);
});
test('malformed and excessive fields cannot send mail', async () => {
  for (const body of [null, [], 'invalid', {}, { ...valid, name: {} }, { ...valid, name: '  ' }, { ...valid, name: 'x\nBcc: victim' }, { ...valid, message: 'x'.repeat(10001) }, { ...valid, email: 'invalid' }, { ...valid, intent: 'toString' }]) {
    const { res, sent } = await run(body);
    assert.equal(res.code, 400);
    assert.equal(sent.length, 0);
  }
});
test('user HTML is rendered as text and line breaks are preserved', async () => {
  const { sent } = await run({ ...valid, name: "Zoë O'Neil <Test>", message: '<img src=x>\nSecond line' });
  assert.ok(sent[0].html.includes('&lt;img src=x&gt;<br/>Second line'));
  assert.ok(sent[0].html.includes('Zoë O&#39;Neil &lt;Test&gt;'));
  assert.ok(!sent[0].html.includes('<img src=x>'));
});
test('provider rejection is not reported as success', async () => {
  const { res, sent } = await run(valid, { sendResult: () => ({ data: null, error: { message: 'rejected' } }) });
  assert.equal(res.code, 500);
  assert.equal(sent.length, 1);
});
test('confirmation rejection does not invite duplicate business notifications', async () => {
  const { res } = await run(valid, { sendResult: n => n === 2 ? { error: { message: 'rejected' } } : undefined });
  assert.equal(res.code, 200);
});
test('GET cannot send mail', async () => {
  const { res, sent } = await run(valid, { method: 'GET' });
  assert.equal(res.code, 405);
  assert.equal(sent.length, 0);
});
