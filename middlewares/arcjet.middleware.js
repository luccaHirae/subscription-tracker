import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          success: false,
          error: "Rate limit exceeded",
        });
      }

      if (decision.reason.isBot()) {
        res.status(403).json({
          success: false,
          error: "Bot detected",
        });
      }

      return res.status(403).json({
        success: false,
        error: "Request denied",
      });
    }

    next();
  } catch (error) {
    console.log('Arcjet middleware error:', error);
    next(error);
  }
}

export default arcjetMiddleware;