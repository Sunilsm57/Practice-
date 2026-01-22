import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService, Todo } from '../services.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  id!: number;
  todo!: Todo;
  editForm!: FormGroup;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private service: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log('entry to edit');

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Todo id:', this.id);

    this.initializeForm();
    this.getTodoData();
  }

  initializeForm() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      completed: [false]
    });
  }

  getTodoData() {
    this.isLoading = true;
    this.service.getTodoById(this.id).subscribe({
      next: (res) => {
        this.todo = res;
        this.editForm.patchValue({
          title: res.title,
          completed: res.completed
        });
        this.isLoading = false;
        console.log('Todo data:', res);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const updatedTodo: Todo = {
      ...this.todo,
      title: this.editForm.get('title')?.value,
      completed: this.editForm.get('completed')?.value
    };

    this.service.updateTodo(this.id, updatedTodo).subscribe({
      next: (res) => {
        console.log('Todo updated successfully:', res);
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error updating todo:', err);
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  get titleError() {
    const titleControl = this.editForm.get('title');
    if (titleControl?.hasError('required')) {
      return 'Title is required';
    }
    if (titleControl?.hasError('minlength')) {
      return 'Title must be at least 3 characters';
    }
    return '';
  }
}
