export interface Exam {
    id?: number;
    name: string;
    code: string;
    country?: string;
    category?: string;
    type?: string;
    createdAt: string;
    createdByUserId?: number;
  }
  
  // -------------------------------------------
  // models/question.model.ts
  // -------------------------------------------
  export interface QuestionModel {
    id?: number;
    questionText?: string;
    optionsJson?: string;
    type?: number;
    difficulty?: number;
    explanation?: string;
    correctOptionIds?: string;
    selectedOptionIds?: string;
    isCorrect?: boolean;
    marks?: number;
    answeredAt?: string;
    options?: string[];
  }
  
  // -------------------------------------------
  // models/test.model.ts
  // -------------------------------------------
  export interface CreateTestRequest {
    examId: number;
    numberOfQuestions?: number;
    subject?: string;
    language?: string;
    difficulty?: number;
    title?: string;
    duration?: string;
  }
  
  export interface QuestionDto {
    id: number;
    questionText?: string;
    questionNo: number;
    optionsJson?: string;
    type: number;
    difficulty?: string;
    explanation?: string;
    correctOptionIds?: string;
    selectedOptionIds?: string;
    isCorrect: boolean;
    isMultipleSelect: boolean;
    marks?: number;
    options?: string[];
  }
  
  export interface TestDetailsDto {
    id: number;
    title?: string;
    language?: string;
    subject?: string;
    duration: string;
    createdAt: string;
    examId: number;
    totalQuestions: number;
    totalMarks?: number;
    marksScored?: number;
    examName?: string;
    examCode?: string;
    status?: string;
    questions?: QuestionDto[];
  }
  
  export interface TestSubmissionResultDto {
    testId: number;
    totalQuestions: number;
    attempted: number;
    correct: number;
    incorrect: number;
    scorePercent: number;
  }
  