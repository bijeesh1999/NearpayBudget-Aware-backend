export const logoutUser = (req, res) => {
  try {
    // 🔑 Replace 'token' with the actual name of your authentication cookie (e.g., 'jwt', 'authToken').
    const cookieName = "USER_TOKEN";

    // 1. Clear the authentication cookie
    // It is crucial to include the same options (like path and domain) used when setting the cookie.
    // If you set the cookie with { httpOnly: true, path: '/' }, you must use path: '/' here.
    res.clearCookie(cookieName, {
      httpOnly: true, // Should match how the cookie was set
      secure: process.env.NODE_ENV === "production", // Use secure in production
      path: "/", // Match the path used when setting the cookie
    });

    // 2. Send a successful response
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(400).json({
      message: "failed to logout",
      error: error.message,
    });
  }
};
