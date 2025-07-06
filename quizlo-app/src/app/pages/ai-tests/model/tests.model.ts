import { QuestionModel } from "./questions.model";

// TestDetailsDto
export interface TestDetailsModel {
    id?: number;
    title?: string;
    language?: string;
    subject?: string;
    duration?: string;        // In TS, use string for TimeSpan/Duration from C#
    createdAt?: string;       // ISO date string
    examId?: number;
    imageUrl?: string;
    difficulty?: string;
    totalQuestions?: number;
    totalMarks?: number | null;
    marksScored?: number | null;
    examName?: string;
    examCode?: string;
    status?: string;
    questions?: QuestionModel[];
  }