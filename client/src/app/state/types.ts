export type Project = {
    id : number,
    name : string,
    description? : string,
    startDate? : string,
    endDate? : string
}

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
  }
  
  export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed",
  }
  export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
  }
  
  export interface Attachment {
    id: number;
    fileURL: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
  }

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    tags: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId: number;
    assignedUserId: number;
    createdAt: Date;
    updatedAt: Date;
    author? : User;
    assignee? : User;
    comments? : Comment[];
    attachments? : Attachment[]
  }

  export interface SearchResults {
    tasks?: Task[],
    users?: User[],
    projects?: Project[]

  }

  export interface Team {
    teamId: number;
    teamName: string;
    productOwnerUserId?: number;
    projectManagerUserId?: number;
  }
