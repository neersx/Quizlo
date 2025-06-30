import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, Input, OnInit, signal } from '@angular/core';
import { TestDetailsModel } from '../model/tests.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-window',
  imports: [CommonModule, FormsModule],
  templateUrl: './test-window.html',
  styleUrl: './test-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestWindow implements OnInit {
@Input() testData : TestDetailsModel = {
  id: 0,
  title: '',
  language: '',
  subject: '',
  duration: '',
  createdAt: '',
  examId: 0,
  totalQuestions: 0,
  totalMarks: 0,
  marksScored: 0,
  examName: '',
  examCode: '',
  status: 'Not Started',
  questions: [],
  difficulty: ''
};
// Reactive signals for state management
answers = signal<{ [key: string]: string | string[] }>({});
timeRemaining = signal<number>(70 * 60); // 70 minutes in seconds
isTestSubmitted = signal<boolean>(false);
currentQuestionIndex = signal<number>(0);

constructor(private cdr: ChangeDetectorRef) {  

}

// Timer variables
private timerInterval: any;

ngOnInit(): void {
  this.startTimer();
  this.loadSavedAnswers();
  this.startAutoSave();
  this.cdr.detectChanges();
}

get currentQuestion() {
  const questions = this.testData?.questions;
  const idx = this.currentQuestionIndex?.();
  if (
    Array.isArray(questions) &&
    typeof idx === 'number' &&
    idx >= 0 &&
    idx < questions.length
  ) {
    return questions[idx];
  }
  return undefined;
}


// Computed properties
formattedTime = computed(() => {
  const total = this.timeRemaining();
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

progressPercentage = computed(() => {
  const totalQuestions = this.testData?.questions?.length ?? 0;
  const answeredQuestions = Object.keys(this.answers())?.length ?? 0;
  return (answeredQuestions / totalQuestions) * 100;
});

answeredQuestionsCount = computed(() => {
  return Object.keys(this.answers()).length;
});

ngOnDestroy(): void {
  if (this.timerInterval) {
    clearInterval(this.timerInterval);
  }
}

private startTimer(): void {
  this.timerInterval = setInterval(() => {
    const current = this.timeRemaining();
    if (current <= 0) {
      this.submitTest(true); // Auto-submit when time is up
      return;
    }
    this.timeRemaining.set(current - 1);
  }, 1000);
}

private loadSavedAnswers(): void {
  const saved = localStorage.getItem('bitsat_answers');
  if (saved) {
    try {
      const parsedAnswers = JSON.parse(saved);
      this.answers.set(parsedAnswers);
    } catch (error) {
      console.error('Error loading saved answers:', error);
    }
  }
}

private startAutoSave(): void {
  setInterval(() => {
    this.saveAnswers();
  }, 30000); // Auto-save every 30 seconds
}

private saveAnswers(): void {
  try {
    localStorage.setItem('bitsat_answers', JSON.stringify(this.answers()));
  } catch (error) {
    console.error('Error saving answers:', error);
  }
}

onSingleOptionSelect(questionId: number = -1, optionValue: string): void {
  const currentAnswers = { ...this.answers() };
  currentAnswers[`question_${questionId}`] = optionValue;
  this.answers.set(currentAnswers);
  this.saveAnswers();
}

charFromCode(index: number): string {
  return String.fromCharCode(65 + index);
}

fromCharCode(index: number): string {
  return String.fromCharCode(65 + index);
}


onMultipleOptionSelect(questionId: number = -1, optionValue: string, isChecked: boolean): void {
  const currentAnswers = { ...this.answers() };
  const questionKey = `question_${questionId}`;
  
  if (!currentAnswers[questionKey]) {
    currentAnswers[questionKey] = [];
  }

  const currentSelections = currentAnswers[questionKey] as string[];
  
  if (isChecked) {
    if (!currentSelections.includes(optionValue)) {
      currentSelections.push(optionValue);
    }
  } else {
    const index = currentSelections.indexOf(optionValue);
    if (index > -1) {
      currentSelections.splice(index, 1);
    }
  }

  // Remove the question from answers if no options are selected
  if (currentSelections.length === 0) {
    delete currentAnswers[questionKey];
  }

  this.answers.set(currentAnswers);
  this.saveAnswers();
}

isOptionSelected(questionId: number = -1, optionValue: string): boolean {
  const questionKey = `question_${questionId}`;
  const answer = this.answers()[questionKey];
  
  if (Array.isArray(answer)) {
    return answer.includes(optionValue);
  }
  
  return answer === optionValue;
}

getDifficultyClass(difficulty: string = 'medium'): string {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'difficulty-easy';
    case 'medium': return 'difficulty-medium';
    case 'hard': return 'difficulty-hard';
    default: return 'difficulty-medium';
  }
}

submitTest(isAutoSubmit: boolean = false): void {
  if (this.timerInterval) {
    clearInterval(this.timerInterval);
  }

  const submissionData = {
    testId: this.testData.id,
    answers: this.answers(),
    submissionTime: new Date().toISOString(),
    isAutoSubmit: isAutoSubmit,
    timeSpent: (70 * 60) - this.timeRemaining()
  };

  console.log('Test submitted:', submissionData);
  
  // Clear saved answers
  localStorage.removeItem('bitsat_answers');
  
  // Mark test as submitted
  this.isTestSubmitted.set(true);

  // In a real application, you would send this data to your backend
  this.processSubmission(submissionData);
}

private processSubmission(submissionData: any): void {
  // Calculate score
  let score = 0;
  let correctAnswers = 0;

  if(this.testData?.questions) {
    this.testData?.questions.forEach(question => {
    const questionKey = `question_${question.id}`;
    const userAnswer = submissionData.answers[questionKey];
    
    if (userAnswer) {
      if (question.isMultipleSelect) {
        // For multiple select, check if the answer matches exactly
        const correctOptions = question.correctOptionIds?.split(',');
        const userOptions = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        
        if (JSON.stringify(correctOptions?.sort()) === JSON.stringify(userOptions.sort())) {
          score += question?.marks ?? 0;
          correctAnswers++;
        }
      } else {
        // For single select
        if (userAnswer === question.correctOptionIds) {
          score += question?.marks ?? 0;
          correctAnswers++;
        }
      }
    }
  });
  }
  

  const result = {
    totalQuestions: this.testData?.questions?.length,
    answeredQuestions: Object.keys(submissionData.answers).length,
    correctAnswers: correctAnswers,
    score: score,
    totalMarks: this.testData.totalMarks,
    percentage: (score / (this.testData?.totalMarks ?? 1)) * 100
  };

  console.log('Test Result:', result);
  alert(`Test Submitted Successfully!\n\nScore: ${score}/${this.testData.totalMarks}\nCorrect Answers: ${correctAnswers}/${this.testData?.questions?.length}\nPercentage: ${result.percentage.toFixed(2)}%`);
}

resetTest(): void {
  this.answers.set({});
  this.timeRemaining.set(70 * 60);
  this.isTestSubmitted.set(false);
  this.currentQuestionIndex.set(0);
  localStorage.removeItem('bitsat_answers');
  this.startTimer();
}

// Navigation methods
goToQuestion(index: number): void {
  this.currentQuestionIndex.set(index);
}

nextQuestion(): void {
  const current = this.currentQuestionIndex();
  if (current < (this.testData?.questions?.length ?? 0) - 1) {
    this.currentQuestionIndex.set(current + 1);
  }
}

previousQuestion(): void {
  const current = this.currentQuestionIndex();
  if (current > 0) {
    this.currentQuestionIndex.set(current - 1);
  }
}

}
