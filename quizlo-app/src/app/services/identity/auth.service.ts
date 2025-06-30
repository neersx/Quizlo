// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient }                      from '@angular/common/http';
import { BehaviorSubject, Observable }     from 'rxjs';
import { map }                             from 'rxjs/operators';
import { isPlatformBrowser }               from '@angular/common';
import { Router }                          from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response.model';
import { User } from '../../shared/services/auth.service';

interface LoginData {
  token:     string;
  userId:    number;
  email:     string;
  firstName: string;
  lastName:  string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl          = `${environment.apiUrl}/Users`;
  private readonly storageTokenKey = 'access_token';
  private readonly storageUserKey  = 'current_user';
  public showLoader:boolean=false;

  private userSubject = new BehaviorSubject<User | null>(this.readUserFromStorage());
  public  user$       = this.userSubject.asObservable();
  public  isLoggedIn$ = this.user$.pipe(map(u => !!u));

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('storage', () => {
        const user = this.readUserFromStorage();
        this.userSubject.next(user);
      });
    }
  }

  /** Expose the current user synchronously */
  public get currentUser(): User | null {
    return this.userSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  /** Call this to log in; returns the User on success */
  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<ApiResponse<LoginData>>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(resp => {
          if (!resp.isSuccess || !resp.data) {
            throw new Error(resp.message || 'Login failed');
          }
          const { token, userId, email, firstName, lastName } = resp.data;
          // Build your User object from returned fields
          const user: User = {
            id: userId,
            email,
            firstName,
            lastName
          };
          this.saveAuthState(token, user);
          return user;
        })
      );
  }

  /** Clears storage and redirects home */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageTokenKey);
      localStorage.removeItem(this.storageUserKey);
    }
    this.userSubject.next(null);
    // this.router.navigate(['/']);
  }

  /** Retrieves token from localStorage (SSR-safe) */
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.storageTokenKey);
  }

  /** Reads the persisted user JSON or null */
  private readUserFromStorage(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const json = localStorage.getItem(this.storageUserKey);
    if (!json) return null;
    try {
      return JSON.parse(json) as User;
    } catch {
      localStorage.removeItem(this.storageUserKey);
      return null;
    }
  }

  /** Persists token & user, then notifies subscribers */
  private saveAuthState(token: string, user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageTokenKey, token);
      localStorage.setItem(this.storageUserKey, JSON.stringify(user));
    }
    this.userSubject.next(user);
    console.log('userSubject now:', this.userSubject.value);
  }
}
