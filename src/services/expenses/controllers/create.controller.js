import { createExpense } from "../services/create.service.js";
import mongoose from "mongoose";


export async function createNewExpense(req, res) {
  try {
    const body = req.body;
    const user = req.user;    

    const TaskData = await createExpense({ body: { ...body, userId: new mongoose.Types.ObjectId(user?.id || "69144994b5095ba2900969cd") } });

    return res.status(200).json({
      data: TaskData,
      message: "category created success",
    });

  } catch (error) {
    res.status(400).json({
      message: "category create error",
      error: error
    })
  }
}
