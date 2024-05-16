export type priority = "low" | "medium" | "high";
export type category = "work" | "personal" | "shopping";
export type filter = "all" | "done" | "todo";
export type taskStatus = "done" | "todo";

export type categoryType = {
  id?: number;
  name: string;
};

export type taskType = {
  id?: number;
  title: string;
  description: string;
  category: number;
  priority: priority;
  DueDate: string;
  isDone: boolean;
};
