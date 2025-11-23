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

    if (authToken) {
      res.cookie("USER_TOKEN", authToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

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
