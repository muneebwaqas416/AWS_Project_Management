export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'Work In Progress',
    REVIEW = 'Under Review',
    DONE = 'Completed',
  }

  export enum TaskPriority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
  }
  export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    tags: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId: number;
    assignedUserId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  