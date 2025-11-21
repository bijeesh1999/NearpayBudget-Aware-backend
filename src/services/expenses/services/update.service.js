import Expense from "../model/expense.schema.js"

export const updateCategoryById = async ({ _id, task }) => {
  console.log({ _id, task });

  const taskData = await Expense.findByIdAndUpdate(
    _id,
    {
      $set: task,
    },
    { new: true }
  );

  return taskData;
};
