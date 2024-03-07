import { Time } from "@angular/common";
import { Project } from "./project.model";

export interface TimerMainDashboardState {
  currentDate: Date;
  selectedDate: Date;
  startDateRange?: Date;
  endDateRange?: Date;
}

export interface TrackingBox {
  project: Project;
  startTime: Time;
  endTime: Time;
  duration: Time;
  tags: string[];
}
