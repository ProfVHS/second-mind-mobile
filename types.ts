export type priority = "low" | "medium" | "high";
export type category = "work" | "personal" | "shopping";

export type categoryType = {
  id?: number;
  name: category;
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
