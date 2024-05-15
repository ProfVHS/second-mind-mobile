export type priority = "low" | "medium" | "high";
export type category = "work" | "personal" | "shopping";

export type taskType = {
  id?: number;
  title: string;
  description: string;
  category: category;
  priority: priority;
  DueDate: string;
  isDone: boolean;
};
