import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TestDetailsDto, CreateTestRequest, TestSubmissionResultDto } from '../model/questions.model';
import { SubmitAnswerDto } from '../model/answer.model';
import { ApiResponse } from '../../../models/api-response.model';
import { TestDetailsModel } from '../model/tests.model';

@Injectable({ providedIn: 'root' })
export class TestService {
  private baseUrl = `${environment.apiUrl}/tests`;

  constructor(private http: HttpClient) {}

  getTests(): Observable<TestDetailsDto[]> {
    return this.http.get<TestDetailsDto[]>(this.baseUrl);
  }

  getTest(id: number): Observable<TestDetailsDto> {
    return this.http.get<TestDetailsDto>(`${this.baseUrl}/${id}`);
  }

  createTest(request: CreateTestRequest): Observable<any> {
    return this.http.post<TestDetailsDto>(this.baseUrl, request);
    // return of(this.mockResponse);
  }

  submitTestAnswers(testId: number, answers: SubmitAnswerDto[]): Observable<TestSubmissionResultDto> {
    const url = `${this.baseUrl}/${testId}/submit`;
    return this.http.post<TestSubmissionResultDto>(url, { answers });
  }

    // Paste your hardcoded response here
    private mockResponse: ApiResponse<TestDetailsModel> = {
      isSuccess: true,
      data: {
        id: 4,
        title: "BITSAT-30-06-2025 Mock Test",
        language: "Tamil",
        subject: "20",
        duration: "01:10:00",
        createdAt: "2025-06-30T09:38:15.904863",
        examId: 7,
        totalQuestions: 0,
        totalMarks: 70,
        difficulty: 'Medium',
        marksScored: null,
        examName: "Birla Institute of Technology and Science Admission Test",
        examCode: '',
        status: "NotStarted",
        questions: [
          {
              "id": 18,
              "questionText": "படிப்பு சுழற்சி என்றால் என்ன?",
              "questionNo": 1,
              "optionsJson": "[\"A. \\u0B95\\u0B9F\\u0BB2\\u0BBF\\u0BA9\\u0BCD \\u0BAE\\u0BC7\\u0BB2\\u0BC7 \\u0BA8\\u0BBF\\u0BB2\\u0BC8 \\u0BAE\\u0BBE\\u0BB1\\u0BCD\\u0BB1\\u0BAE\\u0BCD\",\"B. \\u0B92\\u0BB0\\u0BC1 \\u0B9A\\u0BC6\\u0B99\\u0BCD\\u0B95\\u0BC1\\u0BA4\\u0BCD\\u0BA4\\u0BC1 \\u0BAE\\u0BC1\\u0BB4\\u0BC1 \\u0B9A\\u0BC1\\u0BB4\\u0BB1\\u0BCD\\u0B9A\\u0BBF\",\"C. \\u0B92\\u0BB0\\u0BC1 \\u0BAA\\u0BC1\\u0BB3\\u0BCD\\u0BB3\\u0BBF\\u0BAF\\u0BBF\\u0BA9\\u0BCD \\u0BAA\\u0BBE\\u0BA4\\u0BC8\\u0BAF\\u0BBF\\u0BB2\\u0BCD \\u0BA8\\u0B9F\\u0BAA\\u0BCD\\u0BAA\\u0BA4\\u0BC1\",\"D. \\u0B85\\u0BB3\\u0BB5\\u0BC1\\u0B95\\u0BCB\\u0BB2\\u0BC1\\u0BAE\\u0BCD \\u0B85\\u0BB3\\u0BB5\\u0BC1 \\u0BAE\\u0BBE\\u0BB1\\u0BCD\\u0BB1\\u0BAE\\u0BC1\\u0BAE\\u0BCD\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "படிப்பு சுழற்சி என்பது ஒரு புள்ளி புள்ளியிடும் சுழற்சியைக் குறிக்கின்றது, இது வெவ்வேறு புள்ளிகளின் ஓரங்காலச் சுழற்சியாகும். ( NCERT Physics class 11, p.45 )",
              "correctOptionIds": "B",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. கடலின் மேலே நிலை மாற்றம்",
                  "B. ஒரு செங்குத்து முழு சுழற்சி",
                  "C. ஒரு புள்ளியின் பாதையில் நடப்பது",
                  "D. அளவுகோலும் அளவு மாற்றமும்"
              ]
          },
          {
              "id": 19,
              "questionText": "பேரியல் வாயு என்றால் என்ன?",
              "questionNo": 2,
              "optionsJson": "[\"A. \\u0BAE\\u0BBF\\u0B95\\u0BB5\\u0BC1\\u0BAE\\u0BCD \\u0BAA\\u0BB2\\u0BB5\\u0BC0\\u0BA9\\u0BAE\\u0BCD \\u0BB5\\u0BBE\\u0BAF\\u0BCD\\u0BA8\\u0BCD\\u0BA4 \\u0BB5\\u0BBE\\u0BAF\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BB3\\u0BCD\",\"B. \\u0B8E\\u0BA8\\u0BCD\\u0BA4 \\u0B85\\u0BAE\\u0BC8\\u0BAA\\u0BCD\\u0BAA\\u0BC1\\u0BAE\\u0BCD \\u0B87\\u0BB2\\u0BCD\\u0BB2\\u0BBE\\u0BAE\\u0BB2\\u0BCD \\u0B9A\\u0BC1\\u0BA4\\u0BA8\\u0BCD\\u0BA4\\u0BBF\\u0BB0\\u0BAE\\u0BBE\\u0B95 \\u0B85\\u0BB2\\u0BC8\\u0BA8\\u0BCD\\u0BA4\\u0BC1\\u0BAE\\u0BCD, \\u0BAA\\u0BB0\\u0BB5\\u0BBF\\u0BAF\\u0BC1\\u0BAE\\u0BCD \\u0BAE\\u0BC1\\u0B9F\\u0BBF\\u0BAF\\u0BC1\\u0BAE\\u0BCD \\u0BB5\\u0BBE\\u0BAF\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BB3\\u0BCD\",\"C. \\u0B9A\\u0BC1\\u0BAE\\u0BCD \\u0B9A\\u0BC1\\u0BB5\\u0BC8\\u0B95\\u0BB3\\u0BCD \\u0B89\\u0BB3\\u0BCD\\u0BB3 \\u0BB5\\u0BBE\\u0BAF\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BB3\\u0BCD\",\"D. \\u0BA4\\u0BC2\\u0BAF\\u0BCD\\u0BAE\\u0BC8\\u0BAF\\u0BBE\\u0BA9 \\u0BB5\\u0BBE\\u0BAF\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BB3\\u0BCD\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "பேரியல் வாயுக்கள் என்பது எந்த அமைப்பும் இல்லாமல் சுதந்திரமாக அலைந்து பரவும் வாயுக்கள் ஆகும். ( NCERT Chemistry class 11, p.102 )",
              "correctOptionIds": "B",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": true,
              "marks": 2,
              "options": [
                  "A. மிகவும் பலவீனம் வாய்ந்த வாயுக்கள்",
                  "B. எந்த அமைப்பும் இல்லாமல் சுதந்திரமாக அலைந்தும், பரவியும் முடியும் வாயுக்கள்",
                  "C. சும் சுவைகள் உள்ள வாயுக்கள்",
                  "D. தூய்மையான வாயுக்கள்"
              ]
          },
          {
              "id": 20,
              "questionText": "அடிப்பை C ஈடன் நிரூபிக்கின்ற பிரதான காரணம் என்ன?",
              "questionNo": 3,
              "optionsJson": "[\"A. \\u0BAA\\u0BAF\\u0BA9\\u0BC1\\u0BB3\\u0BCD\\u0BB3 \\u0B95\\u0BBE\\u0BB0\\u0BA3\\u0BBF\\u0B95\\u0BB3\\u0BCD \\u0BAE\\u0B9F\\u0BCD\\u0B9F\\u0BC1\\u0BAE\\u0BC7 \\u0B89\\u0BB3\\u0BCD\\u0BB3\\u0BA9\",\"B. \\u0B85\\u0BA9\\u0BC8\\u0BB5\\u0BB0\\u0BC1\\u0BAE\\u0BCD \\u0BAA\\u0BAF\\u0BA9\\u0BCD\\u0BAA\\u0B9F\\u0BC1\\u0BA4\\u0BCD\\u0BA4\\u0B95\\u0BCD\\u0B95\\u0BC2\\u0B9F\\u0BBF\\u0BAF\\u0BA4\\u0BC1\",\"C. \\u0BAA\\u0BC8\\u0BAA\\u0BC8 \\u0BB0\\u0BBE\\u0B9A\\u0BBF\\u0BAF\\u0BAE\\u0BC8\\u0BAA\\u0BCD\\u0BAA\\u0BBF\\u0BA9\\u0BCD \\u0B85\\u0B9F\\u0BBF\\u0BA4\\u0B9F\",\"D. \\u0BAA\\u0BBF\\u0BB5\\u0BC6\\u0B9F\\u0BCD\\u0B9F\\u0BBF\\u0BA9\\u0BCD \\u0B85\\u0B9F\\u0BBF\\u0BA4\\u0B9F\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "C ஈடன் பயன்பாட்டை அடிப்படையாகக் கொண்டு பைபை தீர்வை நிரூபிக்கின்றோம். இது பைபை விதிகளின் அடிவு. ( NCERT Math, p.156 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. பயனுள்ள காரணிகள் மட்டுமே உள்ளன",
                  "B. அனைவரும் பயன்படுத்தக்கூடியது",
                  "C. பைபை ராசியமைப்பின் அடிதட",
                  "D. பிவெட்டின் அடிதட"
              ]
          },
          {
              "id": 21,
              "questionText": "படிப்பு வாழை என்பது என்ன?",
              "questionNo": 4,
              "optionsJson": "[\"A. \\u0BAE\\u0BBF\\u0BA4\\u0BAE\\u0BBE\\u0BA9 \\u0BB5\\u0B9A\\u0BA4\\u0BBF\\u0BAF\\u0BBE\\u0B95\\u0BC1\\u0BAE\\u0BCD \\u0BA8\\u0BBF\\u0BB2\\u0BC8\",\"B. \\u0B9A\\u0BC1\\u0BB4\\u0BB1\\u0BCD\\u0B9A\\u0BBF\\u0BAF\\u0BC1\\u0B9F\\u0BA9\\u0BCD \\u0B95\\u0BC2\\u0B9F\\u0BBF\\u0BAF \\u0B92\\u0BB0\\u0BC1 \\u0BA8\\u0BBF\\u0BB2\\u0BC8\",\"C. \\u0B92\\u0BB0\\u0BC1 \\u0B95\\u0BC1\\u0BB0\\u0BC1\\u0BA4\\u0BBF \\u0B9A\\u0BC0\\u0BB0\\u0BBE\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD \\u0B9A\\u0BC6\\u0BAF\\u0BB2\\u0BCD\\u0BA4\\u0BBF\\u0BB1\\u0BA9\\u0BCD\",\"D. \\u0BB5\\u0BBF\\u0BA3\\u0BCD\\u0BB5\\u0BC6\\u0BB3\\u0BBF\\u0BAF\\u0BBF\\u0BB2\\u0BCD \\u0BB5\\u0BB0\\u0BC1\\u0BAE\\u0BCD \\u0B9A\\u0BC2\\u0BB0\\u0BBF\\u0BAF \\u0B92\\u0BB3\\u0BBF\\u0BAF\\u0BBF\\u0BA9\\u0BCD \\u0B92\\u0BB0\\u0BC1 \\u0BAA\\u0B95\\u0BC1\\u0BA4\\u0BBF\"]",
              "type": 0,
              "difficulty": "Easy",
              "explanation": "படிப்பு வாழை என்பது நிலையான, மிதமான நிலையில் இருக்கும் நிலையாகும். ( NCERT Physics, p.125 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 1,
              "options": [
                  "A. மிதமான வசதியாகும் நிலை",
                  "B. சுழற்சியுடன் கூடிய ஒரு நிலை",
                  "C. ஒரு குருதி சீராக்கும் செயல்திறன்",
                  "D. விண்வெளியில் வரும் சூரிய ஒளியின் ஒரு பகுதி"
              ]
          },
          {
              "id": 22,
              "questionText": "தாவரங்கள் ஒரு முக்கிய புவியீர்ப்புத் துறையாகும். அதில், அவை எது பயன்படும்?",
              "questionNo": 5,
              "optionsJson": "[\"A. \\u0B95\\u0BBE\\u0BB1\\u0BCD\\u0BB1\\u0BC1 \\u0BA4\\u0BC2\\u0BAF\\u0BCD\\u0BAE\\u0BC8 \\u0B9A\\u0BC6\\u0BAF\\u0BCD\\u0BAF\",\"B. \\u0BAE\\u0BC0\\u0BA9\\u0BCD\\u0BAA\\u0BBF\\u0B9F\\u0BBF\",\"C. \\u0BB5\\u0BBE\\u0BB4\\u0BCD\\u0BB5\\u0BC1\\u0BB0\\u0BBF\\u0BAE\\u0BC8 \\u0B95\\u0BBE\\u0B95\\u0BCD\\u0B95\",\"D. \\u0B9A\\u0BCB\\u0BAE\\u0BCD\\u0BAA\\u0BB2\\u0BCD \\u0B85\\u0BA4\\u0BBF\\u0B95\\u0BB0\\u0BBF\\u0B95\\u0BCD\\u0B95\"]",
              "type": 0,
              "difficulty": "Easy",
              "explanation": "தாவரங்கள் காற்று தூய்மையாக்கும் பணி செய்கின்றன. இவை புவியீர்ப்பை மேம்படுத்துகின்றன. ( NCERT Biology, p.85 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 1,
              "options": [
                  "A. காற்று தூய்மை செய்ய",
                  "B. மீன்பிடி",
                  "C. வாழ்வுரிமை காக்க",
                  "D. சோம்பல் அதிகரிக்க"
              ]
          },
          {
              "id": 23,
              "questionText": "பகுபடையாக்கம் என்றான் என்ன?",
              "questionNo": 6,
              "optionsJson": "[\"A. \\u0B92\\u0BB0\\u0BC1 \\u0BAA\\u0BCA\\u0BB0\\u0BC1\\u0BB3\\u0BBF\\u0BA9\\u0BCD \\u0B85\\u0BA4\\u0BBF\\u0B95\\u0BAA\\u0B9F\\u0BCD\\u0B9A \\u0BAA\\u0BB0\\u0BBF\\u0BAE\\u0BBE\\u0BA3\\u0BAE\\u0BCD\",\"B. \\u0B92\\u0BB0\\u0BC1 \\u0B85\\u0BA3\\u0BC1\\u0BB5\\u0BBF\\u0BA9\\u0BCD \\u0BAE\\u0BA4\\u0BCD\\u0BA4\\u0BBF\\u0BAF\\u0BBF\\u0BB2\\u0BCD \\u0B89\\u0BB3\\u0BCD\\u0BB3 \\u0BAA\\u0B95\\u0BC1\\u0BA4\\u0BBF\",\"C. \\u0B9C\\u0BC7 \\u0BAA\\u0BBF\\u0BAF\\u0BB0\\u0BCD \\u0BAA\\u0BAF\\u0BAA\\u0BBF\\u0BB3\\u0BCD \\u0BAA\\u0BBE\\u0BAF\\u0BBF\\u0BA3\\u0BCD\\u0B9F\\u0BCD\",\"D. \\u0B92\\u0BB0\\u0BC1 \\u0BAA\\u0BCA\\u0BB0\\u0BC1\\u0BB3\\u0BBF\\u0BA9\\u0BCD \\u0B85\\u0BB3\\u0BB5\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BB0\\u0BBF\\u0BAF \\u0BAA\\u0B95\\u0BC1\\u0BA4\\u0BBF\"]",
              "type": 0,
              "difficulty": "Hard",
              "explanation": "பகுபடையாக்கம் என்பது அணுவின் மையத்தில் உள்ள பகுதி ஆகும், இது அணுவின் அமைப்பை விளக்குகிறது. ( NCERT Chemistry, p.50 )",
              "correctOptionIds": "B",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 3,
              "options": [
                  "A. ஒரு பொருளின் அதிகபட்ச பரிமாணம்",
                  "B. ஒரு அணுவின் மத்தியில் உள்ள பகுதி",
                  "C. ஜே பியர் பயபிள் பாயிண்ட்",
                  "D. ஒரு பொருளின் அளவுக்குரிய பகுதி"
              ]
          },
          {
              "id": 24,
              "questionText": "ஒரு கோடுமுது பிளவுகள் இருப்பினும் அதன் பருமன் எவ்வளவு?",
              "questionNo": 7,
              "optionsJson": "[\"A. \\u0B8E\\u0BAA\\u0BCD\\u0BAA\\u0BCB\\u0BA4\\u0BC1 \\u0BA4\\u0BC6\\u0BB0\\u0BBF\\u0BAF\\u0BBE\\u0BA4\\u0BC1\",\"B. \\u0BB5\\u0BBF\\u0B9F\\u0BC1\\u0BB5\\u0BBF\\u0B95\\u0BCD\\u0B95\\u0BB5\\u0BC1\\u0BAE\\u0BCD \\u0B95\\u0BC2\\u0B9F\\u0BBF\\u0BAF\\u0BA4\\u0BC1\",\"C. \\u0B8E\\u0BAA\\u0BCD\\u0BAA\\u0BCB\\u0BA4\\u0BC1\\u0BAE\\u0BCD 0\",\"D. \\u0B85\\u0BA4\\u0BC1\\u0BB5\\u0BC1\\u0BAE\\u0BCD \\u0BAA\\u0BB2 \\u0BB5\\u0BC7\\u0BB1\\u0BC1\\u0BAA\\u0BBE\\u0B9F\\u0BC1\\u0B95\\u0BB3\\u0BCD\"]",
              "type": 0,
              "difficulty": "Hard",
              "explanation": "கோடுமுது பிளவுகள் பொதுவாக பருமனுக்கு பாதிப்பதில்லை, விளக்கராகும். ( NCERT Math, p.220 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": true,
              "marks": 3,
              "options": [
                  "A. எப்போது தெரியாது",
                  "B. விடுவிக்கவும் கூடியது",
                  "C. எப்போதும் 0",
                  "D. அதுவும் பல வேறுபாடுகள்"
              ]
          },
          {
              "id": 25,
              "questionText": "பொதுவான கணக்கு துறையை கூறுக.",
              "questionNo": 8,
              "optionsJson": "[\"A. \\u0BAA\\u0BBF\\u0BAF\\u0BC2\\u0B9F\\u0BCD\\u0B9F\\u0BBF\\u0BAF\\u0BBF\\u0BA9\\u0BCD \\u0BAA\\u0BBF\\u0BA4\\u0BBE\",\"B. \\u0B95\\u0BA3\\u0B95\\u0BCD\\u0B95\\u0BC1 \\u0BAE\\u0BB1\\u0BCD\\u0BB1\\u0BC1\\u0BAE\\u0BCD \\u0B95\\u0BA3\\u0BBF\\u0BA4\\u0BB5\\u0BBF\\u0BAF\\u0BB2\\u0BCD\",\"C. \\u0BA8\\u0BC7\\u0BB0\\u0BBF\\u0BAF\\u0BB2\\u0BCD \\u0BAA\\u0B95\\u0BC1\\u0BAA\\u0BCD\\u0BAA\\u0BBE\\u0BAF\\u0BCD\\u0BB5\\u0BC1\",\"D. \\u0B89\\u0BAF\\u0BBF\\u0BB0\\u0BBF\\u0BAF\\u0BB2\\u0BCD\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "பொதுவான கணக்கு என்பது கணக்கீட்டு மற்றும் கணிதவியல் சார்ந்த துறை ஆகும். ( NCERT Chemistry, p.170 )",
              "correctOptionIds": "B",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. பியூட்டியின் பிதா",
                  "B. கணக்கு மற்றும் கணிதவியல்",
                  "C. நேரியல் பகுப்பாய்வு",
                  "D. உயிரியல்"
              ]
          },
          {
              "id": 26,
              "questionText": "படிப்பு செல்வாக்கு சார்ந்த புள்ளி என்ன?",
              "questionNo": 9,
              "optionsJson": "[\"A. \\u0B93\\u0BB0\\u0BBF\\u0B9F\\u0BAE\\u0BC8\\u0B95\\u0BCD\\u0B95\\u0BAA\\u0BCD\\u0BAA\\u0B9F\\u0BCD\\u0B9F \\u0BAA\\u0BC1\\u0BB3\\u0BCD\\u0BB3\\u0BBF\",\"B. \\u0BAA\\u0BB0\\u0BAA\\u0BCD\\u0BAA\\u0BBF\\u0BB2\\u0BCD \\u0BAA\\u0BB0\\u0BB5\\u0BBF\\u0BAF\\u0BA4\\u0BC1\",\"C. \\u0B92\\u0BB0\\u0BC1 \\u0BB5\\u0BBF\\u0B9A\\u0BC8 \\u0B8F\\u0BB1\\u0BCD\\u0BAA\\u0B9F\\u0BCD\\u0B9F \\u0BAA\\u0BC1\\u0BB3\\u0BCD\\u0BB3\\u0BBF\",\"D. \\u0BA4\\u0BB0\\u0BB5\\u0BC1\\u0B95\\u0BC7\\u0BBE\\u0B9F\\u0BBE\\u0B95\\u0BC1\\u0BAE\\u0BCD \\u0BAA\\u0BC1\\u0BB3\\u0BCD\\u0BB3\\u0BBF\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "படிப்பு செல்வாக்கு என்பது ஒரு விசை அல்லது ஒலிம்புக்கு ஏற்படும் புள்ளி ஆகும். ( NCERT Physics, p.100 )",
              "correctOptionIds": "C",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. ஓரிடமைக்கப்பட்ட புள்ளி",
                  "B. பரப்பில் பரவியது",
                  "C. ஒரு விசை ஏற்பட்ட புள்ளி",
                  "D. தரவுகோடாகும் புள்ளி"
              ]
          },
          {
              "id": 27,
              "questionText": "புவியீர்ப்பின் முக்கிய பணிகள் என்ன?",
              "questionNo": 10,
              "optionsJson": "[\"A. \\u0BB5\\u0BB3\\u0BAE\\u0BC8\\u0B95\\u0BB3\\u0BC8 \\u0BAA\\u0BBE\\u0BA4\\u0BC1\\u0B95\\u0BBE\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD\",\"B. \\u0B95\\u0BBE\\u0BB1\\u0BCD\\u0BB1\\u0BC8 \\u0D32\\u0D40\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD\",\"C. \\u0BAA\\u0BC2\\u0BAE\\u0BBF\\u0BAF\\u0BBF\\u0BA9\\u0BCD \\u0BAA\\u0BB0\\u0BAA\\u0BCD\\u0BAA\\u0BC8 \\u0BB5\\u0BBF\\u0BB0\\u0BBF\\u0BB5\\u0BBE\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD\",\"D. \\u0B8E\\u0BB2\\u0BCD\\u0BB2\\u0BBE\\u0BAE\\u0BCD \\u0B87\\u0BA3\\u0BC8\\u0BA8\\u0BCD\\u0BA4\\u0BC1\"]",
              "type": 0,
              "difficulty": "Easy",
              "explanation": "புவியீர்ப்பின் முக்கிய பணி வளமைகளை பாதுகாக்கும் ஆகும். ( NCERT Geography, p.73 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 1,
              "options": [
                  "A. வளமைகளை பாதுகாக்கும்",
                  "B. காற்றை ലീக்கும்",
                  "C. பூமியின் பரப்பை விரிவாக்கும்",
                  "D. எல்லாம் இணைந்து"
              ]
          },
          {
              "id": 28,
              "questionText": "படிப்பு அழுத்தம் என்ன?",
              "questionNo": 11,
              "optionsJson": "[\"A. \\u0B92\\u0BB0\\u0BC1 \\u0BAA\\u0BB0\\u0BAA\\u0BCD\\u0BAA\\u0BBF\\u0BB2\\u0BCD \\u0B8F\\u0BB1\\u0BCD\\u0BAA\\u0B9F\\u0BC1\\u0BAE\\u0BCD \\u0B85\\u0BB4\\u0BC1\\u0BA4\\u0BCD\\u0BA4\\u0BAE\\u0BCD\",\"B. \\u0B92\\u0BB0\\u0BC1 \\u0B9A\\u0BC6\\u0BB2\\u0BCD\\u0BB2\\u0BB0\\u0B99\\u0BCD\\u0B95\\u0BBF\\u0BA9\\u0BCD \\u0BAE\\u0BC7\\u0BB2\\u0BCD \\u0B85\\u0BB4\\u0BC1\\u0BA4\\u0BCD\\u0BA4\\u0BAE\\u0BCD\",\"C. \\u0B92\\u0BB0\\u0BC1 \\u0BB5\\u0BA3\\u0BCD\\u0B9F\\u0BBF\\u0BAF\\u0BBF\\u0BA9\\u0BCD \\u0BB5\\u0BC7\\u0B95\\u0BAE\\u0BCD\",\"D. \\u0B95\\u0BBE\\u0BB1\\u0BCD\\u0BB1\\u0BBF\\u0BA9\\u0BCD \\u0B93\\u0B9F\\u0BCD\\u0B9F\\u0BAE\\u0BCD\"]",
              "type": 0,
              "difficulty": "Easy",
              "explanation": "படிப்பு அழுத்தம் என்பது ஒரு பரப்பில் ஏற்படும் அழுத்தம் ஆகும், இது படிப்பின் முக்கியக் அடைவாகும். ( NCERT Physics, p.89 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 1,
              "options": [
                  "A. ஒரு பரப்பில் ஏற்படும் அழுத்தம்",
                  "B. ஒரு செல்லரங்கின் மேல் அழுத்தம்",
                  "C. ஒரு வண்டியின் வேகம்",
                  "D. காற்றின் ஓட்டம்"
              ]
          },
          {
              "id": 29,
              "questionText": "பிடிக்கப்பட்ட அணுக்களில் இதனுடைய பங்கு என்ன?",
              "questionNo": 12,
              "optionsJson": "[\"A. \\u0B87\\u0BB5\\u0BC8 \\u0BA4\\u0BC1\\u0BB0\\u0BC1\\u0BB5\\u0B99\\u0BCD\\u0B95\\u0BB3\\u0BBE\\u0B95 \\u0B89\\u0BB3\\u0BCD\\u0BB3\\u0BA9\",\"B. \\u0BAA\\u0BB2\\u0BCD\\u0BB5\\u0B95\\u0BC8\\u0BAF\\u0BBE\\u0BA9 \\u0B85\\u0BA3\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BB3\\u0BC8\\u0B95\\u0BCD \\u0B95\\u0BCA\\u0BA3\\u0BCD\\u0B9F\\u0BC1 \\u0B85\\u0BAE\\u0BC8\\u0BA8\\u0BCD\\u0BA4\\u0BBF\\u0BB0\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD\",\"C. \\u0BA8\\u0BBF\\u0BB1\\u0BC8\\u0BAF \\u0BAE\\u0BC1\\u0BA9\\u0BCD\\u0BA9\\u0BC7\\u0BB1\\u0BCD\\u0BB1\\u0B99\\u0BCD\\u0B95\\u0BB3\\u0BC8 \\u0B95\\u0BCA\\u0BA3\\u0BCD\\u0B9F\\u0BC1\\u0BB3\\u0BCD\\u0BB3\\u0BA9\",\"D. \\u0B85\\u0BA9\\u0BC8\\u0BA4\\u0BCD\\u0BA4\\u0BC1\\u0BAE\\u0BCD \\u0BA4\\u0BB5\\u0BB1\\u0BC1\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "பிடிக்கப்பட்ட அணுக்கள் பல்வேறு அணுக்களைக் கொண்டிருக்கின்றன, இது பொருள்களின் தன்மையை நிர்ணயிக்கிறது. ( NCERT Chemistry, p.55 )",
              "correctOptionIds": "B",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. இவை துருவங்களாக உள்ளன",
                  "B. பல்வகையான அணுக்களைக் கொண்டு அமைந்திருக்கும்",
                  "C. நிறைய முன்னேற்றங்களை கொண்டுள்ளன",
                  "D. அனைத்தும் தவறு"
              ]
          },
          {
              "id": 30,
              "questionText": "புலத்தின் உண்மையான பரிமாணங்கள் எவை?",
              "questionNo": 13,
              "optionsJson": "[\"A. \\u0B92\\u0BB0\\u0BC1 \\u0BAA\\u0B95\\u0BCD\\u0B95 \\u0BAA\\u0BB0\\u0BBF\\u0BAE\\u0BBE\\u0BA3\\u0B99\\u0BCD\\u0B95\\u0BB3\\u0BCD \\u0BAE\\u0B9F\\u0BCD\\u0B9F\\u0BC1\\u0BAE\\u0BC7\",\"B. \\u0B85\\u0BA9\\u0BC8\\u0BA4\\u0BCD\\u0BA4\\u0BC1 \\u0BAA\\u0B95\\u0BCD\\u0B95\\u0B99\\u0BCD\\u0B95\\u0BB3\\u0BC1\\u0BAE\\u0BCD \\u0BAE\\u0BC6\\u0BA9\\u0BCD\\u0BAE\\u0BC8\\u0BAF\\u0BBE\\u0B95\\u0BB5\\u0BC1\\u0BAE\\u0BCD, \\u0B9A\\u0BAE\\u0BAE\\u0BBE\\u0BA9\\u0BB5\\u0BC8\",\"C. \\u0B8E\\u0BA9\\u0BCD\\u0BAA\\u0BA4\\u0BC1 \\u0B92\\u0BB0\\u0BC7 \\u0BAE\\u0BBE\\u0BA4\\u0BBF\\u0BB0\\u0BBF\\u0BAF\\u0BBE\\u0B95 \\u0B87\\u0BB0\\u0BC1\\u0BA8\\u0BCD\\u0BA4\\u0BBE\\u0BB2\\u0BCD \\u0BAE\\u0B9F\\u0BCD\\u0B9F\\u0BC1\\u0BAE\\u0BC7\",\"D. \\u0BAA\\u0BB2 \\u0BAA\\u0B95\\u0BCD\\u0B95\\u0B99\\u0BCD\\u0B95\\u0BB3\\u0BBF\\u0BA9\\u0BCD \\u0B85\\u0BA4\\u0BBF\\u0BB0\\u0BCD\\u0BB7\\u0BCD\\u0B9F\\u0BAE\\u0BCD\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "புலத்தின் உண்மையான பரிமாணங்கள் அதற்கான அனைத்து பக்கங்களும் சமமானவையாகும். ( NCERT Math, p.210 )",
              "correctOptionIds": "B",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. ஒரு பக்க பரிமாணங்கள் மட்டுமே",
                  "B. அனைத்து பக்கங்களும் மென்மையாகவும், சமமானவை",
                  "C. என்பது ஒரே மாதிரியாக இருந்தால் மட்டுமே",
                  "D. பல பக்கங்களின் அதிர்ஷ்டம்"
              ]
          },
          {
              "id": 31,
              "questionText": "ஒளி விரைவில் அணுகும் காரணம் என்ன?",
              "questionNo": 14,
              "optionsJson": "[\"A. \\u0B95\\u0BA3\\u0BCD\\u0BA3\\u0BBE\\u0B9F\\u0BBF\\u0BAF\\u0BBF\\u0BA9\\u0BCD \\u0B9A\\u0BC6\\u0BAF\\u0BB2\\u0BCD\\u0BA4\\u0BBF\\u0BB1\\u0BA9\\u0BCD\",\"B. \\u0BB5\\u0BC6\\u0BAA\\u0BCD\\u0BAA\\u0BB0\\u0B9A\\u0BC8 \\u0B95\\u0BBE\\u0BB0\\u0BA3\\u0BAE\\u0BBE\\u0B95\",\"C. \\u0B86\\u0BA3\\u0BB5\\u0BBF\\u0BAF\\u0BB2\\u0BC8\\u0B95\\u0BCD \\u0B95\\u0BC1\\u0BB1\\u0BC8\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD\",\"D. \\u0BAA\\u0BCA\\u0BA4\\u0BC1 \\u0B95\\u0BBE\\u0BB0\\u0BA3\\u0BBF\\u0B95\\u0BB3\\u0BCD\"]",
              "type": 0,
              "difficulty": "Hard",
              "explanation": "ஒளி விரைவில் அணுகும் காரணம் கண்ணாடியின் அதிர்ஷ்டம் மற்றும் பிரதிபலிப்பு திறன் ஆகும். ( NCERT Physics, p.152 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 3,
              "options": [
                  "A. கண்ணாடியின் செயல்திறன்",
                  "B. வெப்பரசை காரணமாக",
                  "C. ஆணவியலைக் குறைக்கும்",
                  "D. பொது காரணிகள்"
              ]
          },
          {
              "id": 32,
              "questionText": "மனித உடல் அதிகப்படியான தண்ணீரை எங்கே சேமிக்கின்றது?",
              "questionNo": 15,
              "optionsJson": "[\"A. \\u0B87\\u0BB0\\u0BA4\\u0BCD\\u0BA4\\u0BAE\\u0BCD\",\"B. \\u0BA8\\u0BC0\\u0BB0\\u0BCD\\u0B9A\\u0BBF\\u0BA3\\u0BB1\\u0BCD\\u0BB1\\u0BBF\\u0BB2\\u0BCD\",\"C. \\u0BA8\\u0BB0\\u0BAE\\u0BCD\\u0BAA\\u0BC1\\u0B95\\u0BB3\\u0BBF\\u0BB2\\u0BC1\\u0BAE\\u0BCD\",\"D. \\u0BAE\\u0B9E\\u0BCD\\u0B9A\\u0BB3\\u0BCD \\u0BA8\\u0BC0\\u0BB0\\u0BBE\\u0B95\"]",
              "type": 0,
              "difficulty": "Easy",
              "explanation": "மனித உடலில் அதிகப்படியான தண்ணீர் இரத்தத்தில் சேமிக்கப்படுகிறது. ( NCERT Biology, p.110 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 1,
              "options": [
                  "A. இரத்தம்",
                  "B. நீர்சிணற்றில்",
                  "C. நரம்புகளிலும்",
                  "D. மஞ்சள் நீராக"
              ]
          },
          {
              "id": 33,
              "questionText": "சமத்தரவிருத்தி என்றால் என்ன?",
              "questionNo": 16,
              "optionsJson": "[\"A. \\u0BA8\\u0BC6\\u0BB0\\u0BC1\\u0BAA\\u0BCD\\u0BAA\\u0BC1\\u0BAA\\u0BCD\\u0BAA\\u0B9F\\u0BC1\\u0BA4\\u0BB2\\u0BCD\\u0B95\\u0BB3\\u0BCD\",\"B. \\u0B92\\u0BAA\\u0BCD\\u0BAA\\u0BA8\\u0BCD\\u0BA4 \\u0B87\\u0BAF\\u0B95\\u0BCD\\u0B95\\u0BAE\\u0BCD\",\"C. \\u0B92\\u0BB0\\u0BC7 \\u0BA8\\u0BC7\\u0BB0 \\u0B85\\u0BB2\\u0BC8\\u0BAF\\u0BBE\\u0B95\\u0BCD\\u0B95\\u0BAE\\u0BBE\\u0BA9 \\u0B87\\u0BAF\\u0B95\\u0BCD\\u0B95\\u0BAE\\u0BCD\",\"D. \\u0BAE\\u0BBE\\u0BB1\\u0BCD\\u0BB1\\u0BA4\\u0BCD\\u0BA4\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BBE\\u0BA9 \\u0BB5\\u0BBF\\u0BB3\\u0BC8\\u0BB5\\u0BC8 \\u0B85\\u0BA9\\u0BC8\\u0BA4\\u0BCD\\u0BA4\\u0BC1\\u0BAE\\u0BCD\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "சமத்தரவிருத்தி என்பது ஒரே நேரத்தில் மற்றும் ஒரே வகையான இயக்கம் ஆகும். ( NCERT Physics, p.178 )",
              "correctOptionIds": "C",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. நெருப்புப்படுதல்கள்",
                  "B. ஒப்பந்த இயக்கம்",
                  "C. ஒரே நேர அலையாக்கமான இயக்கம்",
                  "D. மாற்றத்துக்கான விளைவை அனைத்தும்"
              ]
          },
          {
              "id": 34,
              "questionText": "தாவரங்களில் சிறுதுளிகள் பயன்படும்?",
              "questionNo": 17,
              "optionsJson": "[\"A. \\u0B9A\\u0BC1\\u0BB1\\u0BCD\\u0BB1\\u0BC1\\u0B9A\\u0BCD\\u0B9A\\u0BC2\\u0BB3\\u0BC8\\u0BAF\\u0BC8 \\u0B9A\\u0BC1\\u0BA4\\u0BCD\\u0BA4\\u0BAE\\u0BBE\\u0B95\\u0BCD\\u0B95\",\"B. \\u0B9A\\u0BC2\\u0BB0\\u0BBF\\u0BAF \\u0B92\\u0BB3\\u0BBF\\u0BAF\\u0BC8 \\u0B85\\u0BA4\\u0BBF\\u0B95\\u0BB0\\u0BBF\\u0B95\\u0BCD\\u0B95\",\"C. \\u0BAA\\u0B9A\\u0BC1\\u0BAE\\u0BCD\\u0BAA\\u0BBE\\u0BB2\\u0BCD \\u0B89\\u0BB1\\u0BCD\\u0BAA\\u0BA4\\u0BCD\\u0BA4\\u0BBF\",\"D. \\u0B85\\u0BB0\\u0BC8 \\u0BAA\\u0B95\\u0BC1\\u0BA4\\u0BBF\"]",
              "type": 0,
              "difficulty": "Medium",
              "explanation": "சிறுதுளிகள் சுற்றுச்சூழலை சுத்தமாக்கும் பணியிடும். ( NCERT Biology, p.94 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 2,
              "options": [
                  "A. சுற்றுச்சூளையை சுத்தமாக்க",
                  "B. சூரிய ஒளியை அதிகரிக்க",
                  "C. பசும்பால் உற்பத்தி",
                  "D. அரை பகுதி"
              ]
          },
          {
              "id": 35,
              "questionText": "ஒருங்கிணைந்த சக்தி என்றால் என்ன?",
              "questionNo": 18,
              "optionsJson": "[\"A. \\u0BAA\\u0BCA\\u0BB0\\u0BC1\\u0BB3\\u0BBF\\u0BA9\\u0BCD \\u0B87\\u0BAF\\u0B99\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD \\u0B9A\\u0B95\\u0BCD\\u0BA4\\u0BBF\",\"B. \\u0B85\\u0BA9\\u0BC8\\u0BA4\\u0BCD\\u0BA4\\u0BC1 \\u0B9A\\u0B95\\u0BCD\\u0BA4\\u0BBF\\u0B95\\u0BB3\\u0BBF\\u0BA9\\u0BCD \\u0BA4\\u0BCA\\u0B95\\u0BC8\",\"C. \\u0BA4\\u0BA3\\u0BBF\\u0B95\\u0BCD\\u0B95\\u0BC8 \\u0B9A\\u0B95\\u0BCD\\u0BA4\\u0BBF\",\"D. \\u0BA4\\u0BA9\\u0BBF\\u0BA4\\u0BCD\\u0BA4\\u0BA9\\u0BBF\\u0BAF\\u0BC7 \\u0B87\\u0BB0\\u0BC1\\u0B95\\u0BCD\\u0B95\\u0BC1\\u0BAE\\u0BCD \\u0B9A\\u0B95\\u0BCD\\u0BA4\\u0BBF\"]",
              "type": 0,
              "difficulty": "Hard",
              "explanation": "ஒருங்கிணைந்த சக்தி என்பது அனைத்து சக்திகளின் தொகையாகும். ( NCERT Physics, p.210 )",
              "correctOptionIds": "B",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": true,
              "marks": 3,
              "options": [
                  "A. பொருளின் இயங்கும் சக்தி",
                  "B. அனைத்து சக்திகளின் தொகை",
                  "C. தணிக்கை சக்தி",
                  "D. தனித்தனியே இருக்கும் சக்தி"
              ]
          },
          {
              "id": 36,
              "questionText": "தினமும் பிறக்கும் புது உயிர்கள் எதனால் ஏற்படுகின்றன?",
              "questionNo": 19,
              "optionsJson": "[\"A. \\u0B9C\\u0BC0\\u0BB5 \\u0BA8\\u0BBF\\u0BB2\\u0BC8\",\"B. \\u0B8A\\u0B9F\\u0B95 \\u0BAE\\u0BBE\\u0BB1\\u0BCD\\u0BB1\\u0BAE\\u0BCD\",\"C. \\u0BAA\\u0BC6\\u0BAF\\u0BB0\\u0BCD\\u0B9A\\u0BCD\\u0B9A\\u0BBF \\u0B89\\u0BB1\\u0BC1\\u0BAA\\u0BCD\\u0BAA\\u0BC1\\u0B95\\u0BB3\\u0BCD\",\"D. \\u0B8F\\u0BB1\\u0BCD\\u0BAA\\u0BC1 \\u0BAE\\u0BB0\\u0BC1\\u0BA8\\u0BCD\\u0BA4\\u0BC1\\u0B95\\u0BB3\\u0BCD\"]",
              "type": 0,
              "difficulty": "Easy",
              "explanation": "புதிய உயிர்கள் பிறப்பது உயிரணுக்கள் மற்றும் ஜீவ நிலை மூலம் ஆகியதாகும். ( NCERT Biology, p.150 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 1,
              "options": [
                  "A. ஜீவ நிலை",
                  "B. ஊடக மாற்றம்",
                  "C. பெயர்ச்சி உறுப்புகள்",
                  "D. ஏற்பு மருந்துகள்"
              ]
          },
          {
              "id": 37,
              "questionText": "பற்றைய வீச்சுகள் எவற்றை நடத்தும்?",
              "questionNo": 20,
              "optionsJson": "[\"A. \\u0BAA\\u0BC1\\u0BB3\\u0BCD\\u0BB3\\u0BBF\\u0B95\\u0BB3\\u0BCD\",\"B. \\u0B95\\u0BCB\\u0B9F\\u0BC1\\u0B95\\u0BB3\\u0BBE\\u0B95 \\u0BB5\\u0BBF\\u0BB3\\u0BC8\\u0BAF\\u0BBE\\u0B9F\\u0BC1\\u0BAE\\u0BCD \\u0BAA\\u0BC1\\u0BB3\\u0BCD\\u0BB3\\u0BBF\\u0B95\\u0BB3\\u0BCD\",\"C. \\u0BAA\\u0B9F\\u0BB2\\u0BCD\\u0B95\\u0BB3\\u0BCD\",\"D. \\u0BB5\\u0BC6\\u0BB1\\u0BCD\\u0BB1\\u0BBF\\u0B9F\\u0B99\\u0BCD\\u0B95\\u0BB3\\u0BCD\"]",
              "type": 0,
              "difficulty": "Easy",
              "explanation": "பற்றைய வீச்சுகள் என்பது புள்ளிகளால் நடத்தப்படுகின்றன. ( NCERT Math, p.154 )",
              "correctOptionIds": "A",
              "selectedOptionIds": null,
              "isCorrect": false,
              "isMultipleSelect": false,
              "marks": 1,
              "options": [
                  "A. புள்ளிகள்",
                  "B. கோடுகளாக விளையாடும் புள்ளிகள்",
                  "C. படல்கள்",
                  "D. வெற்றிடங்கள்"
              ]
          }
      ]
      },
      message: "Test created successfully",
      statusCode: 201
    };
}
