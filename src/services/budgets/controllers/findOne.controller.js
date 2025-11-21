import { findOneBudgetData } from "../services/find.service.js";



export async function findOneBudget(req, res) {
  try {
    const {id} = req.params;

    const sigleTask = await findOneBudgetData(id);

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
