import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { AppComponent } from './app.component';
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}
export interface DoneProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}
@Injectable(
  {
    providedIn: "root"
  }
)

export class ServicesService {


  private API_URL = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {

  }
  getTodos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL).pipe(
      retry(2),
      catchError(error => {
        console.error('HTTP Error', error);
        return of([]);
      })
    );
  }
  getTodoById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }
  getCompletedTodos(): Observable<DoneProduct[]> {
    return this.http.get<DoneProduct[]>(this.API_URL).pipe(
      map(products => products.filter(product => product.price > 0)),
      catchError(() => of([]))
    );
  }
  updateTodo(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product).pipe(
      catchError(error => {
        console.error('Error updating product', error);
        return of(product);
      })
    );
  }
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting product', error);
        return of(null);
      })
    );
  }
}
