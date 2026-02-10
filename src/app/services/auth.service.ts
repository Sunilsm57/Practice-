import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    token?: string;
}

export interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;
    private readonly API_URL = 'https://fakestoreapi.com';

    constructor(private http: HttpClient) {
        const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('currentUser') : null;
        this.currentUserSubject = new BehaviorSubject<User | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public get isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/auth/login`, { username, password }).pipe(
            map(response => {
                if (response) {
                    // FakeStore API returns { token: string }
                    // Use the token from response or generate one
                    const token = response.token || 'token-' + Date.now();

                    // Create user object with token
                    const user: User = {
                        username,
                        email: '',
                        password: '',
                        token: token
                    };
                    // Store user and token in local storage
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.setItem('token', token);
                    }
                    this.currentUserSubject.next(user);
                }
                return response;
            })
        );
    }

    register(user: User): Observable<User> {
        // FakeStore API expects id, username, email, password
        const payload = {
            id: 0,
            username: user.username,
            email: user.email,
            password: user.password
        };

        return this.http.post<User>(`${this.API_URL}/users`, payload).pipe(
            map(response => {
                if (response) {
                    // For registration, generate a mock token
                    const token = 'mock-token-' + Date.now();
                    const userData: User = {
                        ...response,
                        token
                    };
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('currentUser', JSON.stringify(userData));
                        localStorage.setItem('token', token);
                    }
                    this.currentUserSubject.next(userData);
                }
                return response;
            })
        );
    }

    logout(): void {
        // Remove user and token from local storage
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
        }
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    }
}
