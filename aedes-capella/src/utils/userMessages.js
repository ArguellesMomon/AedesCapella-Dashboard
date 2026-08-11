/** Converts technical connection errors into messages a barangay worker can act on. */
export function getFriendlyError(error, fallback = 'The information is not available right now.') {
  const message = String(error?.message || error || '').toLowerCase();

  if (message.includes('invalid login') || message.includes('invalid credentials') || message.includes('password')) {
    return 'The email or password is incorrect. Please try again.';
  }
  if (message.includes('jwt') || message.includes('token') || message.includes('401') || message.includes('session')) {
    return 'Your sign-in has expired. Please sign in again.';
  }
  if (message.includes('network') || message.includes('fetch') || message.includes('failed to fetch')) {
    return 'The dashboard cannot reach the service right now. Check the internet connection and try again.';
  }

  return fallback;
}
