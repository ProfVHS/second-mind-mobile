import * as SQLite from "expo-sqlite";

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
  const todoTable = `CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, isDone BOOLEAN, category INTEGER, DueDate TEXT,FOREIGN KEY(category) REFERENCES category(id));`;
  const categoryTable = `CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);`;

  await db.execAsync(todoTable);
  await db.execAsync(categoryTable);
};

export const insertData = async (db: SQLite.SQLiteDatabase) => {
  const insertTodo = `INSERT INTO todo (title, description, isDone, category, DueDate) VALUES ("test", "testest", false, 0, "today");`;
  const result = await db.execAsync(insertTodo);
  console.log(result);
};

export const fetchData = async (db: SQLite.SQLiteDatabase) => {};
