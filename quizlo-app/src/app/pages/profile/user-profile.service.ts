// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUserProfileModel, UserProfileModel } from './user-profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly apiUrl = `${environment.apiUrl}/user-profile`;
  constructor(private http: HttpClient) {}

  /** GET current user’s profile */
  getProfile(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(this.apiUrl);
  }

  /** PUT updated profile fields */
  updateProfile(payload: any): Observable<void> {
    return this.http.put<void>(this.apiUrl, payload);
  }

  /** DELETE the logged‐in user’s account */
  deleteProfile(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
