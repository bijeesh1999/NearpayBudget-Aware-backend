
import Budget from "../model/budget.schema.js"

export async function createbudget({ body }) {
  console.log({ body });

  const newCategory = await Budget.create(body);

  return newCategory;
}
