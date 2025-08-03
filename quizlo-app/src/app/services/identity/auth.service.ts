// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response.model';
import { RegisterDto } from '../../pages/identity/models/register.model';
import { UserModel } from '../../models/user.model';
import { AuthResponseModel } from '../../models/auth-response.model';
import { LocalStorageService } from '../../utils/localstorage/localstorage.service';
import { LocalStorageKeys } from '../../utils/localstorage/localstorage-keys';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/Users`;
  private readonly storageTokenKey = 'access_token';
  private readonly storageUserKey = 'current_user';
  public showLoader: boolean = false;

  private userSubject = new BehaviorSubject<UserModel | null>(this.readUserFromStorage());
  public user$ = this.userSubject.asObservable();
  public isLoggedIn$ = this.user$.pipe(map(u => !!u));

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
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
  public get currentUser(): UserModel | null {
    return this.userSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  /** Call this to log in; returns the User on success */
  login(credentials: { email: string; password: string }): Observable<UserModel> {
    return this.http
      .post<ApiResponse<AuthResponseModel>>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(resp => {
          if (!resp.isSuccess || !resp.data) {
            throw new Error(resp.message || 'Login failed');
          }
          const { token, userId, email, firstName, lastName, currentUsage, subscriptionPlan } = resp.data;

          const user: UserModel = {
            id: userId,
            email,
            firstName,
            lastName,
            currentUsage,
            subscriptionPlan
          };
          this.saveAuthState(token, user);
          return user;
        })
      );
  }

  validateSession(): Observable<boolean> {
    return this.http.get<{ valid: boolean }>(`${this.apiUrl}/validate-token`).pipe(
      map(response => response.valid)
    );
  }

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerDto);
  }

  /** Clears storage and redirects home */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(LocalStorageKeys.AuthToken);
      localStorage.removeItem(LocalStorageKeys.CurrentUser);
    }
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  /** Retrieves token from localStorage (SSR-safe) */
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.storageTokenKey);
  }

  getUserActiveTests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/active-tests`);
  }

  /** Reads the persisted user JSON or null */
  private readUserFromStorage(): UserModel | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const json = localStorage.getItem(this.storageUserKey);
    if (!json) return null;
    try {
      return JSON.parse(json) as UserModel;
    } catch {
      this.localStorage.removeItem(LocalStorageKeys.CurrentUser);
      return null;
    }
  }

  /** Persists token & user, then notifies subscribers */
  private saveAuthState(token: string, user: UserModel): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.setItem(LocalStorageKeys.AuthToken, token, true);
      this.localStorage.setItem(LocalStorageKeys.CurrentUser, { user });
    }
    this.userSubject.next(user);
  }
}
