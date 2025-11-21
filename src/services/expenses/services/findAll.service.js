import Expense from "../model/expense.schema.js"

export async function findAllExpense({ search, sort, skip, limit }) {
  console.log({ search, sort, skip, limit });

  let searchParams = {};
  let sortOptions = { createdAt: -1 };
  let filterOptions = {};
  if (search) {
    let searchkey = new RegExp(search, "i");
    searchParams = {
      $or: [{ title: searchkey }],
    };
  }
  if (sort?.key && sort?.value) {
    sortOptions = {
      [sort?.key]: sort.value === "asc" ? 1 : -1,
    };
  }

  console.log({ sortOptions });

  const userData = await Expense.aggregate([
    {
      $match: {
        ...searchParams,
        isDeleted: false,
      },
    },
    {
      $sort: {
        ...sortOptions,
      },
    },
    { $skip: skip || 0 },
    { $limit: limit || 10 },
  ]);
  return userData;
}
