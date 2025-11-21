import { findAllExpense } from "../services/findAll.service.js";

export async function findExpense(req, res) {
  try {
    const body = req.body;
    const { month } = req.query

    console.log({ month });



    const getAlluserData = await findAllExpense(body);

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
