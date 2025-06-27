import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { User } from "../../../shared/services/auth.service";
import { RegisterDto, LoginDto } from "../models/register.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/api/Users`;

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  register(dto: RegisterDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, dto);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }
}