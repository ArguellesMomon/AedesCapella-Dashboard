/** Returns current Philippine time as HH:MM:SS */
export function getPHTime() {
  return new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
}

/** Returns current Philippine date as "Mon, Mar 31, 2026" */
export function getPHDate() {
  return new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });
}

/** Returns a past timestamp offset by minsAgo in Philippine time */
export function offsetTime(minsAgo) {
  const d = new Date();
  d.setMinutes(d.getMinutes() - minsAgo);
  return d.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
}

/** Returns number of WiFi signal bars (1–4) from a dBm value */
export function getWifiBars(dbm) {
  if (!dbm) return 0;
  if (dbm > -55) return 4;
  if (dbm > -67) return 3;
  if (dbm > -78) return 2;
  return 1;
}