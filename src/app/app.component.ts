import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { DoneTodo, ServicesService, Todo } from './services.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // deleteTask(id: number) {
  //   if (confirm('Are you sure you want to delete?')) {
  //     this.services.deleteTodo(id).subscribe({
  //       next: () => {
  //         this.todos = this.todos.filter(t => t.id !== id);
  //       },
  //       error: (err) => console.error(err)
  //     });
  //   }
  // }
}