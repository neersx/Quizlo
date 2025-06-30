import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { QuestionModel } from "../model/questions.model";

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private baseUrl = `${environment.apiUrl}/api/Questions`;

  constructor(private http: HttpClient) {}

  getQuestionsByExam(examId: number): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${environment.apiUrl}/api/exams/${examId}/questions`);
  }

  getQuestion(id: number): Observable<QuestionModel> {
    return this.http.get<QuestionModel>(`${this.baseUrl}/${id}`);
  }

  createQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(this.baseUrl, question);
  }

  updateQuestion(id: number, question: QuestionModel): Observable<QuestionModel> {
    return this.http.put<QuestionModel>(`${this.baseUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}