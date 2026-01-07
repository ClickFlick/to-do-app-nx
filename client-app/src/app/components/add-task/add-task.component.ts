import { Component, inject, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CreateTask, Task } from '../../core/types/task';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, InputTextModule, TextareaModule, ButtonModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  taskAdded = output<Partial<Task>>();
  cancelAdd = output<void>();

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      try {
        const body: CreateTask = this.taskForm.value as CreateTask;
        this.taskService.addTask(body).subscribe();
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        this.taskAdded.emit(this.taskForm.value as CreateTask);
        this.taskForm.reset();
      }
    }
  }

  onCancel() {
    this.taskForm.reset();
    this.cancelAdd.emit();
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }
}