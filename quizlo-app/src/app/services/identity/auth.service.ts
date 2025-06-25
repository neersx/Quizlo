import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://quizloai.com/user/api/login'; // Replace with actual API URL
  public showLoader:boolean=false;

  private readonly userData = new BehaviorSubject<any>({}); // Observable cart count
    userData$ = this.userData.asObservable(); 

  constructor(private readonly http: HttpClient) {}

  get currentUser(): any {
    return localStorage.getItem('user') !== null ? JSON.parse(JSON.stringify(localStorage.getItem('user'))) : null;
  }

  // get isUserEmailLoggedIn(): boolean {
  //   if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  login(credentials: { username: string; password: string }): Observable<any> {
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
