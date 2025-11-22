
import Expense from "../model/expense.schema.js"

export async function createExpense({body}) {
  
  const newCategory = await Expense.create(body);

  return newCategory;
}
