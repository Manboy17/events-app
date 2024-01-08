"use server";

import { CreateNewCategoryParams } from "@/types";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";

export async function getAllCategories() {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.log(error);
  }
}

export async function createNewCategory({
  categoryName,
}: CreateNewCategoryParams) {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.log(error);
  }
}
