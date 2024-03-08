export interface Project {
  id: string;
  name: string;
  description: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  name: string;
  description: string;
  estimation: number;
  //dueDate: Date;
}
