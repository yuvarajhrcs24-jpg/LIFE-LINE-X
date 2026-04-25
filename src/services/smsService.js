// Twilio SMS fallback - requires VITE_TWILIO_* env vars in production
const TWILIO_CONFIG = {
  accountSid: import.meta.env.VITE_TWILIO_ACCOUNT_SID || 'YOUR_TWILIO_ACCOUNT_SID',
  authToken: import.meta.env.VITE_TWILIO_AUTH_TOKEN || 'YOUR_TWILIO_AUTH_TOKEN',
  fromNumber: import.meta.env.VITE_TWILIO_FROM_NUMBER || '+1234567890',
};

export function isTwilioConfigured() { return TWILIO_CONFIG.accountSid !== 'YOUR_TWILIO_ACCOUNT_SID'; }

export async function sendSOSSMS(toNumber, location, message) {
  if (!isTwilioConfigured()) {
    console.log('[SMS STUB] Would send SOS to', toNumber, 'at', location, ':', message);
    return { success: false, stub: true, message: 'Configure Twilio to enable SMS' };
  }
  // In production, call backend endpoint that uses Twilio SDK
  return { success: false, message: 'Use server-side Twilio integration for security' };
}

export function buildSOSMessage(location, userName) {
  return `🆘 SOS ALERT from ${userName || 'Unknown'}. Location: https://maps.google.com/?q=${location?.lat},${location?.lng}. Please respond immediately. Time: ${new Date().toLocaleString()}`;
}

export { TWILIO_CONFIG };
