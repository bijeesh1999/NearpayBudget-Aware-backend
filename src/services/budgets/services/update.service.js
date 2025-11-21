import Budget from "../model/budget.schema.js";

export const updateCateBudgetById = async ({ _id, body }) => {
  // console.log({ _id, limitCents });

  const taskData = await Budget.findByIdAndUpdate(
    _id,
    {
      $set: body,
    },
    { new: true }
  );

  return taskData;
};
