import { generateToken } from "../../../config/token.js";
import { findUserByEmail } from "../services/find.service.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    // 1. Find the user by their email and EXPLICITLY SELECT the password and salt.
    const user = await findUserByEmail({ email: userData.email });

    // 2. If the user is not found, throw an error.
    if (!user || !user.authentication) {
      return res.status(403).json({
        message: "user not found",
      });
    }
    // 3. Compare the provided password with the stored hashed password.
    // This check is now safe because 'user.authentication.password' is guaranteed to be a string.
    const isMatch = await bcrypt.compare(
      userData.password,
      user.authentication.password
    );

    // 4. If passwords don't match, throw an error.
    if (!isMatch) {
      return res.status(403).json({
        message: "incorrect password",
      });
    }

    // 5. If login is successful, generate a JWT token.

    const authToken = await generateToken({ id: user?._id, email: user.email });

    if (authToken) {
      res.cookie("USER_TOKEN", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // TRUE in prod
        sameSite: "none", // required for cross-domain cookies on HTTPS
        maxAge: 3600000,
      });
    }

    // 6. Return the token and the user data (without sensitive fields).
    return res.status(200).json({
      user: user.toJSON(),
      authToken,
    });
  } catch (error) {
    console.error("User login failed:", error.message);
    throw new Error(error.message);
  }
};
