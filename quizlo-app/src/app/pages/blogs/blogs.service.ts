import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


/**
 * Represents a BlogModel entry fetched from the API.
 */
export interface BlogEntity {
  id: number;
  createdAt: string;           // ISO timestamp
  htmlContent: string;
  reviews?: any;                // JSON structure
  type: string;
  title: string;
  tags: string;
  sharedLink?: string;
  summary: string;
  author: string;
  status: string;
  imageUrl?: string;
  socialMediaLinks?: any;       // JSON structure
}

export interface BlogModel {
    id: string;
    title: string;
    urlName: string;
    description: string;
    image: string;
    author: string;
    summary: string;
    date: string;
    heartColor: string;
    pageStyleClass: string;
    imageClass: string;
    textColor: string;
    avatar: string;
    tags: string;
    link: string;
    isFeatured: boolean;
  }

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly baseUrl = `${environment.apiUrl}/blogs`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches the list of all blogs.
   */
  getBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(this.baseUrl);
  }

  /**
   * Fetches details of a single BlogModel by its ID.
   * @param id The ID of the BlogModel to retrieve.
   */
  getBlogById(id: number): Observable<BlogModel> {
    return this.http.get<BlogModel>(`${this.baseUrl}/${id}`);
  }

  getBlogByName(name: string): Observable<BlogModel> {
    return this.http.get<BlogModel>(`${this.baseUrl}/details/${name}`);
  }

  /**
   * Updates an existing BlogModel entry.
   * @param BlogModel The BlogModel object with updated fields (must include `id`).
   */
  updateBlog(BlogModel: BlogModel): Observable<BlogModel> {
    return this.http.put<BlogModel>(`${this.baseUrl}/${BlogModel.id}`, BlogModel);
  }
}
