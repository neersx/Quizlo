import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { RegisterDto, LoginDto } from "../models/register.model";
import { UserModel } from "../../../models/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/api/Users`;

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/${id}`);
  }

  register(dto: RegisterDto): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, dto);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }
}