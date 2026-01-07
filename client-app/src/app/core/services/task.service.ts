import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { API } from "../constants/api";
import { CreateTask, Task } from "../types/task";

@Injectable({
  providedIn: "root",
})
export class TaskService extends BaseService{

  constructor() {
    super(API.TASKS);
  }

  getAllTasks() {
    return this.get<Task[]>("", "");
  }

  addTask(task: CreateTask) {
    return this.post<CreateTask>("", task);
  }
  


}