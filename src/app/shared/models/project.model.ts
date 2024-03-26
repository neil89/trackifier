export interface Project {
  id: string;
  name: string;
  description: string;
  tasks?: Task[];
}

// color:
//  QUANTEXA #512288
//  IGLOO #94def1

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
