import { Component, effect, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Task } from '../../core/types/task';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [ButtonModule, TableModule, BadgeModule, CommonModule, DialogModule, AddTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {

  constructor() {
    effect(() => {
      this.getTasks();
    });
  }
  private taskService = inject(TaskService);
  displayDialog = false;
  isLoading = false;

  tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  onTaskAdded(task: Partial<Task>) {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title: task.title || '',
      description: task.description || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks = [...this.tasks, newTask];
    this.hideDialog();
  }

  rowClass(task: Task) {
    return { '!bg-primary !text-primary-contrast': task.completed === true };
  }

  rowStyle(task: Task) {
    if (task.completed === false) {
      return { fontWeight: 'bold', fontStyle: 'italic' };
    }
    return {};
  }

  stockSeverity(task: Task) {
    if (task.completed === false) return 'danger';
    else return 'success';
  }

  private getTasks() {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
        this.isLoading = false;
      },
    });
  }
}
