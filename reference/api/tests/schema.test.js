import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTaskSchema, updateTaskSchema, idParamSchema } from '../src/schemas/task.schema.js';

test('valid task pass hota hai aur title trim hota hai', () => {
  const out = createTaskSchema.parse({ title: '  Login page banao  ' });
  assert.equal(out.title, 'Login page banao');
});

test('khali title reject hota hai', () => {
  assert.throws(() => createTaskSchema.parse({ title: '   ' }));
});

test('dueDate ISO format hi chalega', () => {
  assert.doesNotThrow(() => createTaskSchema.parse({ title: 'x', dueDate: '2026-11-01T10:00:00.000Z' }));
  assert.throws(() => createTaskSchema.parse({ title: 'x', dueDate: 'kal' }));
});

test('update me sab optional hai', () => {
  assert.deepEqual(updateTaskSchema.parse({ done: true }), { done: true });
});

test('id UUID hi honi chahiye', () => {
  assert.throws(() => idParamSchema.parse({ id: '123' }));
  assert.doesNotThrow(() => idParamSchema.parse({ id: '3f2b8f4e-9c7d-4a51-8d2e-0b6a1c5e7f90' }));
});
