import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TestDetailsDto, CreateTestRequest, TestSubmissionResultDto } from '../model/questions.model';
import { SubmitAnswerDto } from '../model/answer.model';

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
