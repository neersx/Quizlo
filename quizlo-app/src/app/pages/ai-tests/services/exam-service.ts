import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/services/auth.service';
import { Exam, TestDetailsDto, CreateTestRequest, TestSubmissionResultDto } from '../model/questions.model';
import { environment } from '../../../../environments/environment';
import { SubmitAnswerDto } from '../model/answer.model';


@Injectable({ providedIn: 'root' })
export class ExamService {
  private baseUrl = `${environment.apiUrl}/api/Exams`;

  constructor(private http: HttpClient) {}

  getExams(pageNumber: number = 1, pageSize: number = 10, search?: string): Observable<Exam[]> {
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
}


@Injectable({ providedIn: 'root' })
export class TestService {
  private baseUrl = `${environment.apiUrl}/api/Tests`;

  constructor(private http: HttpClient) {}

  getTests(): Observable<TestDetailsDto[]> {
    return this.http.get<TestDetailsDto[]>(this.baseUrl);
  }

  getTest(id: number): Observable<TestDetailsDto> {
    return this.http.get<TestDetailsDto>(`${this.baseUrl}/${id}`);
  }

  createTest(request: CreateTestRequest): Observable<TestDetailsDto> {
    return this.http.post<TestDetailsDto>(this.baseUrl, request);
  }

  submitTestAnswers(testId: number, answers: SubmitAnswerDto[]): Observable<TestSubmissionResultDto> {
    const url = `${this.baseUrl}/${testId}/submit`;
    return this.http.post<TestSubmissionResultDto>(url, { answers });
  }
}

