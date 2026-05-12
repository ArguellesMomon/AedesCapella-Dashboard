export function getConfidenceDecision(confidence) {
  if (confidence >= 95) {
    return {
      label: 'High confidence',
      color: 'red',
      meaning: 'Strong match. Prioritize review or response.',
    };
  }

  if (confidence >= 88) {
    return {
      label: 'High confidence',
      color: 'amber',
      meaning: 'Likely match. Continue monitoring or confirm trigger.',
    };
  }

  if (confidence >= 80) {
    return {
      label: 'Moderate confidence',
      color: 'green',
      meaning: 'Meets the response threshold but needs context.',
    };
  }

  return {
    label: 'Low confidence',
    color: 'gray',
    meaning: 'Below auto-response threshold.',
  };
}

export function getBatteryDecision(battery) {
  if (battery < 20) return { label: 'Critical', color: 'red' };
  if (battery < 40) return { label: 'Low', color: 'amber' };
  return { label: 'Good', color: 'green' };
}

export function getAutoResponseReason(status, confidence) {
  if (status === 'fogging') {
    return `Triggered because confidence is ${confidence}% and the node is outside cooldown.`;
  }

  if (status === 'fogged') {
    return `Completed after confidence reached ${confidence}% and the 8-second burst finished.`;
  }

  if (status === 'cooldown') {
    return 'Held because the node recently fogged and is in its 5-minute cooldown window.';
  }

  return 'No automatic response was needed for this entry.';
}

export function getRiskAction(risk) {
  if (risk === 'Critical') return 'Inspect now';
  if (risk === 'High') return 'Review today';
  if (risk === 'Medium') return 'Monitor';
  if (risk === 'Low') return 'Check later';
  return 'No action';
}

export function getRecommendedAction(detection) {
  const confidence = detection?.confidence ?? 0;
  const status = detection?.autoResponse;

  if (status === 'fogged' || status === 'fogging') {
    return {
      action: 'Check the area after fogging',
      reason: `Fogging triggered because confidence reached ${confidence}% and the cooldown rule allowed a burst.`,
      why: 'A field check confirms whether the automatic response reduced activity.',
      color: 'green',
    };
  }

  if (status === 'cooldown') {
    return {
      action: 'Inspect nearby stagnant water',
      reason: 'Fogging was held because the node is still in cooldown.',
      why: 'Source removal prevents repeat detections while the device waits.',
      color: 'amber',
    };
  }

  if (confidence >= 80) {
    return {
      action: 'Keep monitoring this node',
      reason: `Confidence is ${confidence}%, above the 80% response threshold, but no automatic action is active.`,
      why: 'A second detection can confirm whether the activity is sustained.',
      color: 'blue',
    };
  }

  return {
    action: 'Log and observe',
    reason: 'Confidence is below the automatic response threshold.',
    why: 'Low-confidence detections should not trigger fogging on their own.',
    color: 'gray',
  };
}
