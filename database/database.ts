import * as SQLite from "expo-sqlite";
import { taskType } from "../types";

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

export const insertData = async (db: SQLite.SQLiteDatabase) => {
  const insertTodo = `INSERT INTO todo (title, description, priority, isDone, category, DueDate) VALUES ("test", "testest", "low", false, 0, "today");`;
  const result = await db.execAsync(insertTodo);
  console.log(result);
};

export const fetchData = async (
  db: SQLite.SQLiteDatabase,
  setTasks: (tasks: taskType[]) => void
) => {
  const allRows = (await db.getAllAsync("SELECT * FROM todo")) as taskType[];
  setTasks(allRows);
};
