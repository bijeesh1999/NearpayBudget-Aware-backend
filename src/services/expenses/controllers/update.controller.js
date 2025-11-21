
import mongoose from "mongoose";
import { updateCategoryById } from "../services/update.service.js";

export const updateOneCategory = async (req, res) => {
  try {
    const task = req.body;
    const { id } = req.params;

    const updatedTask = await updateCategoryById({
      _id: new mongoose.Types.ObjectId(id),
      task,
    });
    return res.status(200).json({
      message: "user update Success",
      user: updatedTask || {},
    });
  } catch (error) {
    console.error("🔥 User updation failed:", error.message);
    return res.status(400).json({
      message: "user updation failed",
      error: error.message,
    });
  }
};
