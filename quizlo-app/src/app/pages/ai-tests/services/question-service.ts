import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Question } from "../model/questions.model";

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private baseUrl = `${environment.apiUrl}/api/Questions`;

  constructor(private http: HttpClient) {}

  getQuestionsByExam(examId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.apiUrl}/api/exams/${examId}/questions`);
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.baseUrl, question);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}