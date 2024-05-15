import * as SQLite from "expo-sqlite";
import { categoryType, taskType } from "../types";

export const connectToDatabase = async () => {
  console.log("Connecting to database");

  try {
    const db = await SQLite.openDatabaseAsync("SecondMind");
    console.log("Connected to database");
    return db;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  const todoTable = `CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, priority VARCHAR(6), isDone BOOLEAN, category INTEGER, DueDate TEXT,FOREIGN KEY(category) REFERENCES category(id));`;
  const categoryTable = `CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);`;

  await db.execAsync(todoTable);
  await db.execAsync(categoryTable);
};

export const addTask = async (db: SQLite.SQLiteDatabase, task: taskType) => {
  console.log("Adding task to database");
  const insertTodo = `INSERT INTO todo (title, description, priority, isDone, category, DueDate) VALUES (?, ?, ?, false, ?, ?);`;
  try {
    const result = await db.runAsync(
      `INSERT INTO todo (title, description, priority, isDone, category, DueDate) VALUES (?, ?, ?, false, ?, ?);`,
      `${task.title}`,
      `${task.description}`,
      `${task.priority}`,
      0,
      `${task.DueDate.toString()}`
    );
    console.log("Task added to database");
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

export const getTasks = async (
  db: SQLite.SQLiteDatabase,
  setTasks: (tasks: taskType[]) => void
) => {
  const allRows = (await db.getAllAsync("SELECT * FROM todo")) as taskType[];
  setTasks(allRows);
};

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

export const deleteTaskById = async (db: SQLite.SQLiteDatabase, id: number) => {
  await db.runAsync("DELETE FROM todo WHERE id = ?;", id);
};

export const deleteData = async (db: SQLite.SQLiteDatabase) => {
  await db.runAsync("DROP TABLE todo;");
  console.log("Deleted all data");
};
