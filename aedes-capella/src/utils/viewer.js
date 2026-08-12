/*
 * Who is looking at the screen, and therefore how much engineering detail the
 * screen may show.
 *
 * The dashboard's normal audience is barangay health workers, so the default
 * everywhere is the plain view. Model probabilities, boot/sequence numbers,
 * ring ordinals, free heap and raw dBm are meaningless to them and invite
 * misreading, so those are shown only to roles that maintain the system.
 *
 * Least privilege on failure: an unknown or unfetched role is treated as
 * non-technical rather than assumed to be staff.
 */

export const TECHNICAL_ROLES = Object.freeze(['admin', 'technical_personnel']);

export function isTechnicalRole(role) {
  return TECHNICAL_ROLES.includes(role);
}

/**
 * Display name for a device.
 *
 * Stored labels look like "aedescapella-unit-1", which tells a health worker
 * nothing. Show the unit number instead and keep the stored label for the
 * people who maintain the hardware.
 */
export function formatDeviceName(label, { technical = false } = {}) {
  if (!label) return 'Unknown device';
  if (technical) return label;

  const match = String(label).match(/(\d+)\s*$/);
  return match ? `Device ${Number(match[1])}` : label;
}
