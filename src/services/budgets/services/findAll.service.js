import Budget from "../model/budget.schema.js";

export async function findAllBudgets({ search, sort, skip, limit, id }) {
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

  const userData = await Budget.aggregate([
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
