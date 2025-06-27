import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/users`; // Replace with actual API URLenvironment.apiUrl; // Replace with actual API URL
  public showLoader:boolean=false;

  private readonly userData = new BehaviorSubject<any>({}); // Observable cart count
    userData$ = this.userData.asObservable(); 

  constructor(private readonly http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

/** only read localStorage when running in the browser */
get currentUser(): any {
  if (!isPlatformBrowser(this.platformId)) {
    return null; // server‐side: no localStorage
  }

  const json = localStorage.getItem('user');
  // guard against null *or* literal "undefined"
  if (!json || json === 'undefined') {
    return null;
  }

  try {
    return JSON.parse(json);
  } catch (err) {
    console.error('Could not parse user JSON from localStorage:', json, err);
    // clear the bad value so we don’t loop on it
    localStorage.removeItem('user');
    return null;
  }
}
set currentUser(user: any) {
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }
  if (user) {
    // only store well‐formed objects
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
  this.userData.next(user);
}

  // get isUserEmailLoggedIn(): boolean {
  //   if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.result?.token);
        localStorage.setItem('user', JSON.stringify(response.result?.user));
        this.userData.next(response.result?.user);
        return response;
      })
    );
  }

  register(credentials: { phoneNumber: string; password: string; name: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userData.next({});
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
