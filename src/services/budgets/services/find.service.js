import mongoose from "mongoose";
import Budget from "../model/budget.schema.js"

export async function findOneBudgetData(id) {
  const userData = await Budget.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      },
    },
  ]);
  return userData;
}
