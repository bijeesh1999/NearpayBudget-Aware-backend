import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
