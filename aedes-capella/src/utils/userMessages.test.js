import test from 'node:test';
import assert from 'node:assert/strict';
import { getFriendlyError } from './userMessages.js';

test('turns common sign-in and connection failures into plain guidance', () => {
  assert.equal(getFriendlyError(new Error('Invalid login credentials')), 'The email or password is incorrect. Please try again.');
  assert.equal(getFriendlyError(new Error('JWT expired')), 'Your sign-in has expired. Please sign in again.');
  assert.equal(getFriendlyError(new Error('Failed to fetch')), 'The dashboard cannot reach the service right now. Check the internet connection and try again.');
  assert.equal(getFriendlyError(new Error('unknown')), 'The information is not available right now.');
});
