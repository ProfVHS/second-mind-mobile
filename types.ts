export type priority = "low" | "medium" | "high";
export type category = "work" | "personal" | "shopping";

export type taskType = {
  id: number;
  taskName: string;
  taskDescription: string;
  category: category;
  priority: priority;
  date: string;
};
