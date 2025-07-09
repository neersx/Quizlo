import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


/**
 * Represents a blog entry fetched from the API.
 */
export interface Blog {
  id: number;
  createdAt: string;           // ISO timestamp
  htmlContent: string;
  reviews: any;                // JSON structure
  type: string;
  title: string;
  tags: string;
  sharedLink: string;
  summary: string;
  author: string;
  status: string;
  imageUrl: string;
  socialMediaLinks: any;       // JSON structure
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
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl);
  }

  /**
   * Fetches details of a single blog by its ID.
   * @param id The ID of the blog to retrieve.
   */
  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.baseUrl}/${id}`);
  }

  /**
   * Updates an existing blog entry.
   * @param blog The blog object with updated fields (must include `id`).
   */
  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.baseUrl}/${blog.id}`, blog);
  }
}
