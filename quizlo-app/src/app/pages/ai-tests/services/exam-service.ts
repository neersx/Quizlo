import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Exam } from '../model/questions.model';
import { environment } from '../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ExamService {
  private baseUrl = `${environment.apiUrl}/exams`;
  private dropdownUrl = `${environment.apiUrl}/dropdown`;
  constructor(private http: HttpClient) {}

  getExams(pageNumber: number = 1, pageSize: number = 100, search?: string): Observable<Exam[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Exam[]>(this.baseUrl, { params });
  }

  getExam(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.baseUrl}/${id}`);
  }

  createExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(this.baseUrl, exam);
  }

  updateExam(id: number, exam: Exam): Observable<Exam> {
    return this.http.put<Exam>(`${this.baseUrl}/${id}`, exam);
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getSubjectsByExamId(examId: number): Observable<any[]> {
    return this.http.get<any>(`${this.dropdownUrl}/subjects-by-exam/${examId}`)
      .pipe(
        map(resp => resp.data as any[])
      );
  }
}
