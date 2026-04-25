export function calculateTrustScore(user) {
  let score = 50;
  score += (user.confirmations || 0) * 5;
  score += (user.resolvedRequests || 0) * 10;
  score -= (user.fakeFlags || 0) * 15;
  score += (user.verifiedPhone ? 10 : 0);
  score += (user.verifiedId ? 20 : 0);
  return Math.min(100, Math.max(0, score));
}

export function getTrustLevel(score) {
  if (score >= 80) return { level: 'Verified', color: 'green', icon: '✅' };
  if (score >= 60) return { level: 'Trusted', color: 'blue', icon: '🔵' };
  if (score >= 40) return { level: 'New', color: 'yellow', icon: '🟡' };
  return { level: 'Flagged', color: 'red', icon: '🚩' };
}

export function isFakeRequest(request) {
  const flags = [];
  if ((request.upvotes || 0) < -(request.downvotes || 0) * 2) flags.push('Low community trust');
  if ((request.reports || 0) >= 3) flags.push('Multiple reports');
  if (request.authorTrustScore < 20) flags.push('Low author trust');
  return { isFake: flags.length >= 2, flags };
}
