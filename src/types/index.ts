export type TaskPriority = 'Low' | 'Medium' | 'High';
export type ApplicationStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
}

export interface AppData {
  tasks: Task[];
  applications: JobApplication[];
}
