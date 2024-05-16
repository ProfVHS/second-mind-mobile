import * as SQLite from "expo-sqlite";
import { categoryType, filter, taskType } from "../types";

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

export const getCatagoryById = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  setCategories: (categories: categoryType) => void
) => {
  const allRows = (await db.getFirstAsync(
    "SELECT * FROM category WHERE id = ?;",
    id
  )) as categoryType;
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

export const deleteCategoryById = async (
  db: SQLite.SQLiteDatabase,
  id: number
) => {
  console.log("Deleting category from database");
  await db.runAsync("DELETE FROM todo WHERE category = ?;", id);
  await db.runAsync("DELETE FROM category WHERE id = ?;", id);
};

export const getTasksInCategory = async (
  db: SQLite.SQLiteDatabase,
  filter: filter,
  id: number,
  setTasks: (tasks: taskType[]) => void
) => {
  console.log("Getting tasks from database", filter);

  if (filter === "all") {
    const allRows = (await db.getAllAsync(
      `SELECT * FROM todo WHERE category = ?`,
      id
    )) as taskType[];
    setTasks(allRows);
  } else {
    const allRows = (await db.getAllAsync(
      `SELECT * FROM todo WHERE isDone = ? AND category = ?`,
      filter === "done" ? 1 : 0,
      id
    )) as taskType[];
    setTasks(allRows);
  }
};
