import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { AppComponent } from './app.component';
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface DoneTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
@Injectable(
  {
    providedIn: "root"
  }
)

export class ServicesService {


  private API_URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {

  }
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL).pipe(
      retry(2),
      catchError(error => {
        console.error('HTTP Error', error);
        return of([]);
      })
    );
  }
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.API_URL}/${id}`);
  }
  getCompletedTodos(): Observable<DoneTodo[]> {
    return this.http.get<DoneTodo[]>(this.API_URL).pipe(
      map(todos => todos.filter(todo => todo.completed)),
      catchError(() => of([]))
    );
  }
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.API_URL}/${id}`, todo).pipe(
      catchError(error => {
        console.error('Error updating todo', error);
        return of(todo);
      })
    );
  }
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting todo', error);
        return of(null);
      })
    );
  }
}
