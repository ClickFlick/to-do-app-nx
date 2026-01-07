
export class Task {
  id!: number;
  title!: string;
  description?: string;
  completed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class CreateTask {
  title!: string;
  description?: string;
}