import * as SQLite from "expo-sqlite";
import { filter, taskType } from "../types";
import { format } from "date-fns";

export const connectToDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("SecondMind", {
      useNewConnection: true,
    });
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
      task.category,
      `${task.DueDate.toString()}`
    );
  } catch (e) {
    console.error(e);
  }
};

export const getTasks = async (
  db: SQLite.SQLiteDatabase,
  date: Date,
  filter: filter,
  setTasks: (tasks: taskType[]) => void
) => {
  const formatedDate = format(date, "yyyy-MM-dd");

  if (filter === "all") {
    const allRows = (await db.getAllAsync(
      `SELECT * FROM todo WHERE DueDate LIKE '${formatedDate}%'`,
      formatedDate
    )) as taskType[];
    setTasks(allRows);
  } else {
    const allRows = (await db.getAllAsync(
      `SELECT * FROM todo WHERE DueDate LIKE '${formatedDate}%' AND isDone = ?`,
      filter === "done" ? 1 : 0
    )) as taskType[];
    setTasks(allRows);
  }
};

export const deleteTaskById = async (db: SQLite.SQLiteDatabase, id: number) => {
  await db.runAsync("DELETE FROM todo WHERE id = ?;", id);
};

export const editTaskById = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  task: taskType
) => {
  await db.runAsync(
    "UPDATE todo SET title = ?, description = ?, priority = ?, DueDate = ? WHERE id = ?;",
    task.title,
    task.description,
    task.priority,
    task.DueDate,
    id
  );
};

export const setTaskStatus = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  status: boolean
) => {
  await db.runAsync("UPDATE todo SET isDone = ? WHERE id = ?;", status, id);
};

export const deleteData = async (db: SQLite.SQLiteDatabase) => {
  await db.runAsync("DROP TABLE todo;");
  console.log("Deleted all data");
};
