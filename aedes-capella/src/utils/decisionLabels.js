export function getConfidenceDecision(confidence) {
  if (confidence >= 95) {
    return {
      label: 'Very high',
      color: 'red',
      meaning: 'Strong match. Prioritize review or response.',
    };
  }

  if (confidence >= 88) {
    return {
      label: 'High',
      color: 'amber',
      meaning: 'Likely match. Continue monitoring or confirm trigger.',
    };
  }

  if (confidence >= 80) {
    return {
      label: 'Moderate',
      color: 'green',
      meaning: 'Meets the response threshold but needs context.',
    };
  }

  return {
    label: 'Low',
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
