import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
process.env.SUPABASE_URL = 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'x'.repeat(40);
process.env.FIREBASE_PROJECT_ID = 'demo-project';
process.env.FIREBASE_CLIENT_EMAIL = 'firebase-adminsdk@demo-project.iam.gserviceaccount.com';
process.env.FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDkAtI2j8CUTs/F\nW6nwh647jsjxGIBOT86KqzBZX+MhASCJVNRf2o2U5XmGHMhOEQD92Wf51OcCO0j/\nXQaFDehsKNdgCpwQ5f2pGaX2J9ge4vTrG6F5G7tDVxS3ASGYz9tZ+374rKRIGCxJ\nh/wDkFzXxNjTw9PacxolAHCK2GYml0b4zbKM4witDeU947rJbN7EgmtytXlyajHI\nqqUq7yWYMIcbZm2VtH4vc9tPMDTYB/YQzvfjetD2YiiLn2FpR2togFit0gmozoMX\nCbDjSVa1oxElGAYiZN7tPkemQjdCxRTlTk3XTuVrbIthiafaUAoRBK4vE9webv61\n4muJTi0PAgMBAAECggEADvKyZlpRRUfPbkBeqUKz5Pqs6MVy7+9ieovTjSBwqwLA\nZ9B0Zd5VptvOdkDfzuJlfr7ohqPzCx3o4LjwCvwI70JUMFsxtRfm49WnIDangArg\nBKPYl7B+O+FzHbZIxhRmbIVE4zeqQ4G2MZHlLzShKZIhpuxxMKKYJbHcLvYV6FSl\n4NyhLMUSKl+zy8vjm9Q4txsxADl1yzjz+wXNnB8PN/HHsLhR9zAqeWhdi5csDqsz\ngHCSbJ0abeYygD6nP79grVCnzA8viJSqOOtqA/96Hh8dF+cAtwjTBweHLuVsPgFa\no7ZLub2uwZ41Ca+nXVJ2K12GDJA2VDNGTl0WjufigQKBgQD8MN+1lpViCF5Xlvx3\n6k5TCKv4Na+h5PSluMcGuyTqWpcg7yMKH5/4hqYcXD8hsHCUxloJqnogy4ceJ/7J\nIdIWLvIqv5j3VikOKv7Ely4kAP/Fyj1Z7gqMighFpoCntM9S7F2BdsfR79TEOCji\neNQTe1stztaLGRHPO8ppysxGjwKBgQDndHPt7F44D1FuZorSwJ9sC69baPfHe+Wr\nwwoaE6JZkX4htisY5GQWBom0WIS2sNOE8W9O2xj+4HzvQJzmqr8aBGrAGwfZpKao\n/i18OedpyNpG6jxh5ty/BEqUyYdmLZuhFBWvJjNzdCWqoKcL7dA+klf/GseObUVw\n68kA/+7xgQKBgE1Ur0R/aE8nQcaaBdC/iETt4824qKJ8Eoi+oEjwGeHC5ZSzv4rb\nJ7KNl2Ia50DtWZhFOla8b7aeslAM85O5SzKCMr/pAH7XbL9rb7PYp81igQuleCqb\nU6DEssSoycqjJu/GiuWoBp3ZbOS+U8seQem3ab4iLqd4iH2DWA4YoYsBAoGBAKAN\nOElzpSew+AeW4zKfvt5RKj7U1Frew1BGPAsSPrcfVBBtz1mUPd25Qaozd/p5Rpts\n9SKbgapmhB5SGO2tbx7HpSYYyxHmuNSth7iatfrByKc3PPAaW9W/Wu+OeJHgwfje\nUaxfhz60N4PJOhqWpeVO/4jJ9Or5hwZyFfoaARqBAoGBAJ5XJCZGV5oHpiYAXJb2\nja6S3MVWY31ORRDAC4gscoahEziZ4yTJ9hNzq2RPF6YskXA+9AOQJznp8DEud2FJ\nXBpR8G9DQMwY0c0HEhQ3djKFoFx6OiUylzE98Yyb1XWlJ0Cdyef1Lyjjnb16eGTL\nfOu8xZ5RrBkUROZDdmaFjKUv\n-----END PRIVATE KEY-----\n';

const { default: request } = await import('supertest');
const { createApp } = await import('../src/app.js');
const app = createApp();

test('GET /api/health 200 deta hai', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('GET /api/me bina token ke 401 deta hai', async () => {
  const res = await request(app).get('/api/me');
  assert.equal(res.status, 401);
  assert.ok(res.body.error.message);
});

test('GET /api/me galat token par 401 deta hai', async () => {
  const res = await request(app).get('/api/me').set('Authorization', 'Bearer abc.def.ghi');
  assert.equal(res.status, 401);
});

test('unknown route par JSON 404', async () => {
  const res = await request(app).get('/api/nahi-hai');
  assert.equal(res.status, 404);
  assert.match(res.body.error.message, /Route nahi mila/);
});
