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

export interface ProjectAutocompleteQueryEvent {
  originalEvent: Event;
  query: string;
}

export interface ProjectAutocompleteSelectEvent {
  originalEvent: Event;
  value: Project;
}
