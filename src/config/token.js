// src/config/jwtConfig.ts
import jwt from "jsonwebtoken";
// It's a best practice to store this in an environment variable
// DO NOT hardcode this in production.
export const jwtSecret =
  process.env.JWT_SECRET || "MY_OWN_AI-PROJECT001/V1-PRIME";

// Function to generate a JWT token
export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {  expiresIn: "7d" });
};

// Function to verify a JWT token
export const verifyToken = (token) => {
  try {
    // 1. Verify the token using the secret key
    // 2. Cast the decoded result to our IJwtPayload interface
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    // If an error occurs (e.g., the token is invalid or expired)
    // return null to indicate failure.
    return null;
  }
};
