// types.ts
export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Deshboard: undefined;
  TaskListScreen: { tasks: Task[]; title: string };
  TaskList: {
    tasks: Task[];
    title: string;
  };
};

// Define the Task type if not already defined
export interface Task {
  id: number;
  title: string;
  description?: string;
  time?: string;
  completed?: boolean;
  icon?: string;
}
