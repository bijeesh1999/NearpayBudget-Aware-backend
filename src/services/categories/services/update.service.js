import Tasks from "../model/category.schema.js";

export const updateCategoryById = async ({ _id, task }) => {

  const taskData = await Tasks.findByIdAndUpdate(
    _id,
    {
      $set: task,
    },
    { new: true }
  );

  return taskData;
};
