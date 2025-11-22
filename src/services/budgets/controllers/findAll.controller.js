import { findAllBudgets } from "../services/findAll.service.js";

export async function findAllBudget(req, res) {
  try {
    const body = req.body;
    const { month } = req.query
    const user = req.user;

    const getAlluserData = await findAllBudgets({body,id:user?.id});

    return res.status(200).json({
      data: getAlluserData || [],
      message: "user fetch success",
    });
  } catch (error) {
    res.status(400).json({
      message: "data fetch failed",
      error: error,
    });
  }
}
