import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SubmitAnswerDto } from "../pages/ai-tests/model/answer.model";
import { TestDetailsDto, CreateTestRequest, TestSubmissionResultDto } from "../pages/ai-tests/model/questions.model";

@Injectable({ providedIn: 'root' })
export class DropdownService {
  private baseUrl = `${environment.apiUrl}/dropdown`;

  constructor(private http: HttpClient) {}

  getLanguagesDropdown(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/languages`);
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

