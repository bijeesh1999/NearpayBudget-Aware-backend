import mongoose from "mongoose";
import Expense from "../model/expense.schema.js"

export async function findOneExpenseData(id) {
  console.log({ id });
  const userData = await Expense.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      },
    },
  ]);
  return userData;
}
