
import Category from "../model/category.schema.js"

export async function createCategory({body}) {
  console.log({body});
  
  const newCategory = await Category.create(body);

  return newCategory;
}
