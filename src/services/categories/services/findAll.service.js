import Category from "../model/category.schema.js";

export async function findAllCategories({ month, id }) {

  const userData = await Category.aggregate([
    {
      $match: {
        isDeleted: false,
        userId: id,
      },
    },
    {
      $lookup: {
        from: "budgets",
        let: {
          categoryId: "$_id",
          currentMonth: month && month !== "undefined" ? month : null,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$categoryId", "$$categoryId"],
                  },
                  {
                    $cond: {
                      // IF $$currentMonth is null/undefined (not provided)
                      if: { $ifNull: ["$$currentMonth", false] },
                      // THEN: Check if $month == $$currentMonth
                      then: { $eq: ["$month", "$$currentMonth"] },
                      // ELSE: Return true (always match, effectively disabling the month filter)
                      else: true,
                    },
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
        preserveNullAndEmptyArrays:
          month == undefined || month == "undefined" ? true : false,
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
  return userData;
}
