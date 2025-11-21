import { generateToken } from "../../../config/token.js";
import { createUser } from "../services/create.service.js";
import { findUserByEmail } from "../services/find.service.js";
import bcrypt from "bcrypt";

export const userSignUp = async (req, res) => {
  try {
    const userData = req.body;
    const isUser = await findUserByEmail({ email: userData?.email });

    if (isUser) {
      return res.status(400).json({
        message: "user already existt",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await createUser({
      ...userData,
      password: hashedPassword,
      salt,
    });

    const authToken = await generateToken({
      id: newUser?._id,
      email: newUser?.email,
    });

    res.cookie("USER_TOKEN", authToken, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie (XSS protection)
      secure: process.env.NODE_ENV === "local", // Use secure cookies in production
      maxAge: 3600000, // Cookie expiration time (e.g., 1 hour)
    });

    // Respond with a success message and the newly created user data
    return res.status(201).json({
      message: "User signed up successfully!",
      user: { newUser },
    });
  } catch (error) {
    // Log the full error for debugging
    console.error("User signup failed:", error.message);
    // Send a more detailed error message to the client
    return res.status(500).json({
      message: "User signup failed............",
      error: error.message,
    });
  }
};
