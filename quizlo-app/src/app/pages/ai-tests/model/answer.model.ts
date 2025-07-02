export interface SubmitAnswerDto {
    questionId: number;
    selectedIds?: string[];
  }

 export interface AnswerPayload {
    answers: SubmitAnswerDto[];
  }
