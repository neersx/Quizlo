import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TestDetailsDto, CreateTestRequest, TestSubmissionResultDto } from '../model/questions.model';
import { AnswerPayload, SubmitAnswerDto } from '../model/answer.model';
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

  getTestResult(id: number): Observable<TestDetailsDto> {
    return this.http.get<TestDetailsDto>(`${this.baseUrl}/result/${id}`);
  }

  createTest(request: CreateTestRequest): Observable<any> {
    // return this.http.post<TestDetailsDto>(this.baseUrl, request);
    return of(this.mockResponse);
  }

  createInitialTest(request: CreateTestRequest): Observable<any> {
    return this.http.post<TestDetailsDto>(`${this.baseUrl}/create-initial-test`, request);

  }

  submitTestAnswers(testId: number | undefined, answers: SubmitAnswerDto[]): Observable<TestSubmissionResultDto> {
    const url = `${this.baseUrl}/${testId}/submit`;
    return this.http.post<TestSubmissionResultDto>(url, { answers });
  }

    // Paste your hardcoded response here
    private mockResponse: ApiResponse<TestDetailsModel> = {
        "isSuccess": true,
        "data": {
            "id": 5,
            "title": "IBPS_PO-30-06-2025 Mock Test",
            "language": "English",
            "subject": "All",
            "duration": "01:00:00",
            "createdAt": "2025-06-30T17:00:50.419866",
            "examId": 8,
            "totalQuestions": 0,
            "totalMarks": 48,
            "marksScored": null,
            "examName": "IBPS Probationary Officer",
            "examCode": "IBPS_PO",
            "status": "NotStarted",
            "questions": [
                {
                    "id": 38,
                    "questionText": "If the sum of two numbers is 20 and their difference is 4, what are the numbers?",
                    "questionNo": 1,
                    "optionsJson": "[\"A. 12 and 8\",\"B. 14 and 6\",\"C. 16 and 4\",\"D. 10 and 10\"]",
                    "type": 0,
                    "difficulty": "Medium",
                    "explanation": "Solution: Let the numbers be x and y. x + y = 20, x - y = 4 → solving gives x=12, y=8. (Quantitative Aptitude by R.S. Agarwal, p. 45)",
                    "correctOptionIds": "A",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 2,
                    "options": [
                        "A. 12 and 8",
                        "B. 14 and 6",
                        "C. 16 and 4",
                        "D. 10 and 10"
                    ]
                },
                {
                    "id": 39,
                    "questionText": "Choose the correctly spelled word:",
                    "questionNo": 2,
                    "optionsJson": "[\"A. Accomodate\",\"B. Accommodate\",\"C. Acommodate\",\"D. Accomadate\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "Correct spelling is 'Accommodate'. (NCERT English Grammar, p. 78)",
                    "correctOptionIds": "B,C",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": true,
                    "marks": 1,
                    "options": [
                        "A. Accomodate",
                        "B. Accommodate",
                        "C. Acommodate",
                        "D. Accomadate"
                    ]
                },
                {
                    "id": 40,
                    "questionText": "In a certain code, if 'TABLE' is written as 'XEGIh', what is the code for 'CHAIR'?",
                    "questionNo": 3,
                    "optionsJson": "[\"A. EGKSU\",\"B. EIKU\",\"C. EIKV\",\"D. EIKU\"]",
                    "type": 0,
                    "difficulty": "Medium",
                    "explanation": "Pattern involves shifting positions; 'CHAIR' follows similar code logic. (Reasoning Coding-Decoding, CAT Previous Year Papers)",
                    "correctOptionIds": "D",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 2,
                    "options": [
                        "A. EGKSU",
                        "B. EIKU",
                        "C. EIKV",
                        "D. EIKU"
                    ]
                },
                {
                    "id": 41,
                    "questionText": "Which is the largest planet in the Solar System?",
                    "questionNo": 4,
                    "optionsJson": "[\"A. Earth\",\"B. Jupiter\",\"C. Saturn\",\"D. Mars\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "Jupiter is the largest planet in our Solar System. (NCERT Science textbook, p. 210)",
                    "correctOptionIds": "B",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. Earth",
                        "B. Jupiter",
                        "C. Saturn",
                        "D. Mars"
                    ]
                },
                {
                    "id": 42,
                    "questionText": "A train travels at 60 km/h. How far will it travel in 45 minutes?",
                    "questionNo": 5,
                    "optionsJson": "[\"A. 45 km\",\"B. 50 km\",\"C. 55 km\",\"D. 60 km\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "Distance = speed × time; 60 km/h × 0.75 hr = 45 km. (NCERT Math, p. 89)",
                    "correctOptionIds": "A",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. 45 km",
                        "B. 50 km",
                        "C. 55 km",
                        "D. 60 km"
                    ]
                },
                {
                    "id": 43,
                    "questionText": "Select the antonym of 'Generous':",
                    "questionNo": 6,
                    "optionsJson": "[\"A. Stingy\",\"B. Kind\",\"C. Noble\",\"D. Friendly\"]",
                    "type": 0,
                    "difficulty": "Medium",
                    "explanation": "'Stingy' is the antonym of 'Generous'. (NCERT English Vocabulary, p. 56)",
                    "correctOptionIds": "A",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 2,
                    "options": [
                        "A. Stingy",
                        "B. Kind",
                        "C. Noble",
                        "D. Friendly"
                    ]
                },
                {
                    "id": 44,
                    "questionText": "If all roses are flowers and some flowers fade quickly, which of the following is true?",
                    "questionNo": 7,
                    "optionsJson": "[\"A. Some roses fade quickly\",\"B. All flowers that fade quickly are roses\",\"C. Some flowers that fade quickly are roses\",\"D. No roses fade quickly\"]",
                    "type": 0,
                    "difficulty": "Hard",
                    "explanation": "Some flowers fade quickly and roses are flowers, so some roses may fade quickly. (Verbal Reasoning, Topper book)",
                    "correctOptionIds": "C",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 3,
                    "options": [
                        "A. Some roses fade quickly",
                        "B. All flowers that fade quickly are roses",
                        "C. Some flowers that fade quickly are roses",
                        "D. No roses fade quickly"
                    ]
                },
                {
                    "id": 45,
                    "questionText": "Who is known as the 'Father of the Nation' in India?",
                    "questionNo": 8,
                    "optionsJson": "[\"A. Jawaharlal Nehru\",\"B. Mahatma Gandhi\",\"C. Subhas Chandra Bose\",\"D. B.R. Ambedkar\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "Mahatma Gandhi is called the 'Father of the Nation' for leading independence movements. (NCERT History, p. 78)",
                    "correctOptionIds": "B",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. Jawaharlal Nehru",
                        "B. Mahatma Gandhi",
                        "C. Subhas Chandra Bose",
                        "D. B.R. Ambedkar"
                    ]
                },
                {
                    "id": 46,
                    "questionText": "What is the smallest prime number?",
                    "questionNo": 9,
                    "optionsJson": "[\"A. 0\",\"B. 1\",\"C. 2\",\"D. 3\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "2 is the smallest prime number, divisible only by 1 and itself. (Mathematics NCERT prime numbers, p. 20)",
                    "correctOptionIds": "C",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. 0",
                        "B. 1",
                        "C. 2",
                        "D. 3"
                    ]
                },
                {
                    "id": 47,
                    "questionText": "Fill in the blank: She ____ beautifully in the dance competition.",
                    "questionNo": 10,
                    "optionsJson": "[\"A. performed\",\"B. perform\",\"C. performing\",\"D. performs\"]",
                    "type": 0,
                    "difficulty": "Medium",
                    "explanation": "Correct tense usage is 'performed' in past tense. (NCERT English Grammar, p. 102)",
                    "correctOptionIds": "A",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 2,
                    "options": [
                        "A. performed",
                        "B. perform",
                        "C. performing",
                        "D. performs"
                    ]
                },
                {
                    "id": 48,
                    "questionText": "Find the next number in the sequence: 2, 4, 8, 16, ____?",
                    "questionNo": 11,
                    "optionsJson": "[\"A. 18\",\"B. 24\",\"C. 32\",\"D. 64\"]",
                    "type": 0,
                    "difficulty": "Medium",
                    "explanation": "Sequence doubles each time: 2,4,8,16, next is 32. (Number Series, practice books)",
                    "correctOptionIds": "C",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 2,
                    "options": [
                        "A. 18",
                        "B. 24",
                        "C. 32",
                        "D. 64"
                    ]
                },
                {
                    "id": 49,
                    "questionText": "Which currency is used in Japan?",
                    "questionNo": 12,
                    "optionsJson": "[\"A. Yen\",\"B. Peso\",\"C. Won\",\"D. Rupee\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "Japan's currency is Yen. (NCERT Economics, p. 52)",
                    "correctOptionIds": "A",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. Yen",
                        "B. Peso",
                        "C. Won",
                        "D. Rupee"
                    ]
                },
                {
                    "id": 50,
                    "questionText": "If a pen costs 15 rupees and a notebook costs 45 rupees, what is the cost of 3 pens and 2 notebooks?",
                    "questionNo": 13,
                    "optionsJson": "[\"A. 105\",\"B. 120\",\"C. 135\",\"D. 150\"]",
                    "type": 0,
                    "difficulty": "Medium",
                    "explanation": "Total = 3×15 + 2×45 = 45 + 90 = 135. (Mathematics, practice problems)",
                    "correctOptionIds": "C",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 2,
                    "options": [
                        "A. 105",
                        "B. 120",
                        "C. 135",
                        "D. 150"
                    ]
                },
                {
                    "id": 51,
                    "questionText": "Choose the correct antonym of 'Happy':",
                    "questionNo": 14,
                    "optionsJson": "[\"A. Sad\",\"B. Joyful\",\"C. Excited\",\"D. Glad\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "'Sad' is the antonym of 'Happy'. (NCERT English Vocabulary, p. 60)",
                    "correctOptionIds": "A",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. Sad",
                        "B. Joyful",
                        "C. Excited",
                        "D. Glad"
                    ]
                },
                {
                    "id": 52,
                    "questionText": "All bananas are fruits. Some fruits are cherries. Which of the following is true?",
                    "questionNo": 15,
                    "optionsJson": "[\"A. Some cherries are bananas\",\"B. All cherries are fruits\",\"C. Some fruits are cherries\",\"D. All bananas are cherries\"]",
                    "type": 0,
                    "difficulty": "Hard",
                    "explanation": "Some fruits being cherries and all bananas being fruits means some cherries could be bananas, but at least some are cherries. (Logical reasoning basics)",
                    "correctOptionIds": "C",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 3,
                    "options": [
                        "A. Some cherries are bananas",
                        "B. All cherries are fruits",
                        "C. Some fruits are cherries",
                        "D. All bananas are cherries"
                    ]
                },
                {
                    "id": 53,
                    "questionText": "Which city is known as the 'Pink City'?",
                    "questionNo": 16,
                    "optionsJson": "[\"A. Jaipur\",\"B. Udaipur\",\"C. Ahmedabad\",\"D. Varanasi\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "Jaipur is called the 'Pink City' for its pink-painted buildings. (Rajasthan Tourism Guide)",
                    "correctOptionIds": "A",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. Jaipur",
                        "B. Udaipur",
                        "C. Ahmedabad",
                        "D. Varanasi"
                    ]
                },
                {
                    "id": 54,
                    "questionText": "A shopkeeper sells an article at a profit of 20%. If the cost price is 200 rupees, what is the selling price?",
                    "questionNo": 17,
                    "optionsJson": "[\"A. 220\",\"B. 240\",\"C. 250\",\"D. 260\"]",
                    "type": 0,
                    "difficulty": "Medium",
                    "explanation": "Selling Price = Cost Price + 20% profit = 200 + 40 = 240 (but check options; correct is 240), correction: it's 200 + 20% of 200 = 200+40=240, so correct answer is B. 240.",
                    "correctOptionIds": "D",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 2,
                    "options": [
                        "A. 220",
                        "B. 240",
                        "C. 250",
                        "D. 260"
                    ]
                },
                {
                    "id": 55,
                    "questionText": "Identify the grammatical error in the sentence: 'He don’t knows the answer.'",
                    "questionNo": 18,
                    "optionsJson": "[\"A. He\",\"B. don\\u2019t\",\"C. knows\",\"D. the answer\"]",
                    "type": 0,
                    "difficulty": "Hard",
                    "explanation": "'Don’t' should be 'doesn’t' for third person singular. (NCERT English Grammar, p. 105)",
                    "correctOptionIds": "B",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 3,
                    "options": [
                        "A. He",
                        "B. don’t",
                        "C. knows",
                        "D. the answer"
                    ]
                },
                {
                    "id": 56,
                    "questionText": "If in a coding system, ‘APPLE’ is written as ‘ELPPA’, how is ‘ORANGE’ written?",
                    "questionNo": 19,
                    "optionsJson": "[\"A. EGNARO\",\"B. EGNARO\",\"C. EROANG\",\"D. EGNARO\"]",
                    "type": 0,
                    "difficulty": "Hard",
                    "explanation": "Pattern is reversing the word; ‘ORANGE’ reversed is ‘EGNARO’. (Coding-Decoding methods, reasoning books)",
                    "correctOptionIds": "B",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 3,
                    "options": [
                        "A. EGNARO",
                        "B. EGNARO",
                        "C. EROANG",
                        "D. EGNARO"
                    ]
                },
                {
                    "id": 57,
                    "questionText": "Which organ is responsible for pumping blood in the human body?",
                    "questionNo": 20,
                    "optionsJson": "[\"A. Brain\",\"B. Kidney\",\"C. Heart\",\"D. Lungs\"]",
                    "type": 0,
                    "difficulty": "Easy",
                    "explanation": "The heart pumps blood throughout the body. (NCERT Science, p. 102)",
                    "correctOptionIds": "C",
                    "selectedOptionIds": null,
                    "isCorrect": false,
                    "isMultipleSelect": false,
                    "marks": 1,
                    "options": [
                        "A. Brain",
                        "B. Kidney",
                        "C. Heart",
                        "D. Lungs"
                    ]
                }
            ]
        },
        "message": "Test created successfully",
        "statusCode": 201
    };
}
