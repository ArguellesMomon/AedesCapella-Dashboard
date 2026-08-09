import test from 'node:test';
import assert from 'node:assert/strict';
import { describeDeviceState, formatDuration, formatTimestamp, getStatusPresentation } from './deviceStatus.js';

test('maps every declared sensor state to a plain-language label', () => {
  assert.equal(getStatusPresentation('online').label, 'Working');
  assert.equal(getStatusPresentation('stale').label, 'Check soon');
  assert.equal(getStatusPresentation('offline').label, 'Not reporting');
  assert.equal(getStatusPresentation('never_seen').label, 'Not connected yet');
  assert.equal(getStatusPresentation('logging_fault').label, 'Records may be missing');
});

test('never-seen and logging-fault messages are explicit', () => {
  assert.match(describeDeviceState({ operational_state: 'never_seen' }), /never sent an update/i);
  assert.match(describeDeviceState({ operational_state: 'logging_fault' }), /records may not be saved/i);
});

test('duration and null timestamps are safe', () => {
  assert.equal(formatDuration(null), '—');
  assert.equal(formatDuration(90_000_000), '1d 1h 0m');
  assert.equal(formatTimestamp(null), 'Never');
});
