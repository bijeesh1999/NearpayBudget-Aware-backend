import { verifyToken } from "../config/token.js";
import { findUserById } from "../services/users/services/find.service.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const TOKEN = req.cookies.USER_TOKEN;

    if (!TOKEN) {
      return res.status(401).json({
        message: "Authentication failed: No token provided.",
      });
    }

    console.log({ TOKEN });

    // 1. First, verify the token to ensure it's valid and not expired.
    const decodedPayload = verifyToken(TOKEN);

    if (!decodedPayload) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid or expired token." });
    }

    // 2. Use the user ID from the decoded token to find the user in the database.
    const user = await findUserById({ id: decodedPayload.id });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found." });
    }

    // 3. Attach the user object to the request for subsequent middleware/route handlers.
    req.user = user;

    // 4. Proceed to the next middleware or route handler.
    next();
  } catch (error) {
    console.error("Authentication failed:", error.message);
    return res
      .status(401)
      .json({ message: "Authentication failed: Unauthorized." });
  }
};
