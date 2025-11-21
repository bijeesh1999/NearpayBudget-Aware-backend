import mongoose from "mongoose";
import { updateCateBudgetById } from "../services/update.service.js";

export const updateOneBudget = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const updatedTask = await updateCateBudgetById({
      _id: new mongoose.Types.ObjectId(id),
      body,
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
