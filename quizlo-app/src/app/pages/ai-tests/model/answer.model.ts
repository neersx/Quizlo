export interface SubmitAnswerDto {
    questionId: number;
    selectedIds?: string[];
  }

 export interface AnswerPayload {
    answers: SubmitAnswerDto[];
  }

  export interface SubmitTestRequest {
    testId: number;
    durationCompletedIn: string; // minutes
    isAutoSubmit: boolean;
    submissionTime: string;
    rawAnswers?: any;
    answers: SubmitAnswerDto[];
  }
