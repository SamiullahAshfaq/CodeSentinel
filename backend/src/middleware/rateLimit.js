// Simple in-memory rate limiter for code execution
const userRequests = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute per user

export const codeExecutionRateLimit = (req, res, next) => {
  const userId = req.user._id.toString();
  const now = Date.now();

  if (!userRequests.has(userId)) {
    userRequests.set(userId, []);
  }

  const requests = userRequests.get(userId);

  // Remove old requests outside the window
  const recentRequests = requests.filter((time) => now - time < WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: "Too many code execution requests. Please try again later.",
      retryAfter: Math.ceil((recentRequests[0] + WINDOW_MS - now) / 1000),
    });
  }

  recentRequests.push(now);
  userRequests.set(userId, recentRequests);

  next();
};

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [userId, requests] of userRequests.entries()) {
    const recentRequests = requests.filter((time) => now - time < WINDOW_MS);
    if (recentRequests.length === 0) {
      userRequests.delete(userId);
    } else {
      userRequests.set(userId, recentRequests);
    }
  }
}, 60 * 60 * 1000); // Run every hour
