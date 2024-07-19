import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7122/api/User'; 
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        this.setLocalStorageItem('isLoggedIn', 'true');
        this.setLocalStorageItem('userRole', response.role); 
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      username,
      email,
      passwordHash: password, 
      role: 'user'
    });
  }

  checkLoginStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  logout(): void {
    this.removeLocalStorageItem('isLoggedIn');
    this.removeLocalStorageItem('userRole'); 
    this.isLoggedInSubject.next(false);
  }

  setLoggedInStatus(status: boolean): void {
    if (status) {
      this.setLocalStorageItem('isLoggedIn', 'true');
    } else {
      this.removeLocalStorageItem('isLoggedIn');
    }
    this.isLoggedInSubject.next(status);
  }

  private hasToken(): boolean {
    return !!this.getLocalStorageItem('isLoggedIn');
  }

  private getLocalStorageItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }

  getRole(): string | null {
    return this.getLocalStorageItem('userRole');
  }
}
