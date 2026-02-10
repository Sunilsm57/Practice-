import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService, Product } from '../services.service';
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
  product!: Product;
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
    console.log('Product id:', this.id);

    this.initializeForm();
    this.getProductData();
  }

  initializeForm() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  getProductData() {
    this.isLoading = true;
    this.service.getTodoById(this.id).subscribe({
      next: (res) => {
        this.product = res;
        this.editForm.patchValue({
          title: res.title,
          price: res.price,
          category: res.category,
          description: res.description,
          image: res.image
        });
        this.isLoading = false;
        console.log('Product data:', res);
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
    const updatedProduct: Product = {
      ...this.product,
      title: this.editForm.get('title')?.value,
      price: this.editForm.get('price')?.value,
      category: this.editForm.get('category')?.value,
      description: this.editForm.get('description')?.value,
      image: this.editForm.get('image')?.value
    };

    this.service.updateTodo(this.id, updatedProduct).subscribe({
      next: (res) => {
        console.log('Product updated successfully:', res);
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error updating product:', err);
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
