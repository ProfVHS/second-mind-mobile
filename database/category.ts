import * as SQLite from "expo-sqlite";
import { categoryType } from "../types";

export const getCategories = async (
  db: SQLite.SQLiteDatabase,
  setCategories: (categories: categoryType[]) => void
) => {
  const allRows = (await db.getAllAsync(
    "SELECT * FROM category"
  )) as categoryType[];
  console.log(allRows);
  setCategories(allRows);
};

export const addCategory = async (
  db: SQLite.SQLiteDatabase,
  category: categoryType
) => {
  console.log("Adding category to database");
  try {
    await db.runAsync(
      `INSERT INTO category (name) VALUES (?);`,
      `${category.name}`
    );
    console.log("Category added to database");
  } catch (e) {
    console.error(e);
  }
};

export const editCategoryById = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  category: categoryType
) => {
  try {
    await db.runAsync(
      `UPDATE category SET name = ? WHERE id = ?;`,
      `${category.name}`,
      id
    );
  } catch (e) {
    console.error(e);
  }
};
