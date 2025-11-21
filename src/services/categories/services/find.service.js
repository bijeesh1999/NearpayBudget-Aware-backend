import mongoose from "mongoose";
import Categoty from "../model/category.schema.js";

export async function findOneCategoryData(id) {
  const category = await Categoty.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "budgets",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$categoryId", "$$categoryId"],
                  },
                ],
              },
              isDeleted: false,
            },
          },
        ],
        as: "budget",
      },
    },
    {
      $unwind: {
        path: "$budget",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "expenses",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$categoryId", "$$categoryId"] }],
              },
              isDeleted: false,
            },
          },
        ],
        as: "expense",
      },
    },
    {
      $addFields: {
        // 🔑 FIX: Use $sum with $map to iterate over the 'expense' array
        totalSpent: {
          $sum: {
            $map: {
              input: "$expense", // The array created by $lookup
              as: "exp",
              in: "$$exp.amountCents", // Extract the amountCents from each item
            },
          },
        },
      },
    },
  ]);
  return category;
}
