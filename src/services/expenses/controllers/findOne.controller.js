import { findOneExpenseData } from "../services/find.service.js";



export async function findOneExpense(req, res) {
  try {
    const {id} = req.params;

    const sigleTask = await findOneExpenseData(id);

    return res.status(200).json({
      data: sigleTask || [],
      message: "Task fetch success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Task fetch failed",
      error: error,
    });
  }
}
