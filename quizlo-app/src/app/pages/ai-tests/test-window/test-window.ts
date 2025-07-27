import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { TestDetailsModel } from '../model/tests.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerPayload, SubmitTestRequest } from '../model/answer.model';
import { TestService } from '../services/test-service';
import { QuestionModel } from '../model/questions.model';
import { getSecondsFromTimeSpan, GetTimeSpan } from '../../../utils/helpers/timespan.helper';
import { TestSkeletonLoader } from '../test-skeleton-loader/test-skeleton-loader';
import { LocalStorageService } from '../../../utils/localstorage/localstorage.service';
import { LocalStorageKeys } from '../../../utils/localstorage/localstorage-keys';
import { GridLoader } from '../../../shared/common/loaders/grid-loader/grid-loader';

type RawAnswers = Record<string, string | string[]>;
type AnswerSignalType = { [key: string]: string | string[] };

@Component({
  selector: 'app-test-window',
  imports: [CommonModule, FormsModule, TestSkeletonLoader, GridLoader],
  templateUrl: './test-window.html',
  providers: [TestService],
  styleUrl: './test-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestWindow implements OnInit, OnDestroy {
  testId = 0;
  @Input() testData: TestDetailsModel = {
    id: 0,
    title: '',
    language: '',
    subject: '',
    duration: '',
    createdAt: '',
    examId: 0,
    totalQuestions: 0,
    AvailableQuesInHub: 0,
    totalMarks: 0,
    marksScored: 0,
    examName: '',
    examCode: '',
    status: 'Not Started',
    questions: [],
    difficulty: ''
  };
  result: any;
  subjectId: number | undefined;
  questions: QuestionModel[] = [];
  isLoadingTest = true;
  isLoadingQuestions = true;
  submittingTest = false;
  testDetails: TestDetailsModel | undefined;
  // Reactive signals for state management
  answers = signal<{ [key: string]: string | string[] }>({});
  timeRemaining = signal<number>(70 * 60); // 70 minutes in seconds
  isTestSubmitted = signal<boolean>(false);
  currentQuestionIndex = signal<number>(0);
  questionIndexes: number[] = [];

  currentVariant: 'default' | 'wave' | 'pulse' | 'building' = 'default';

  variants = [
    { key: 'default' as const, name: 'Progressive' },
    { key: 'wave' as const, name: 'Wave Effect' },
    { key: 'pulse' as const, name: 'Pulse Effect' },
    { key: 'building' as const, name: 'Building Animation' }
  ];

  constructor(private cdr: ChangeDetectorRef,
    private localStorage: LocalStorageService, private router: Router,
    private testService: TestService, private route: ActivatedRoute,
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.testId = idParam !== null ? +idParam : NaN;
    if (this.testId) {
      const activeTestId = this.localStorage.getItem(LocalStorageKeys.UserTests)?.activeTestId;
      if (activeTestId && activeTestId !== this.testId) {
        this.localStorage.removeItem(LocalStorageKeys.UserTests);
      }
      this.loadTest();
      effect(() => {
        //console.log('⏳ Time Remaining C:', this.timeRemaining(), 'seconds');
      });
    }
  }

  // Timer variables
  private timerInterval: any;

  ngOnInit(): void {

  }

  loadTestQuestions() {
    this.isLoadingQuestions = true;
    this.testService.getTestQuestions(this.testId).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess && resp.data) {
          this.questions = resp.data.questions as QuestionModel[];
          this.questions.forEach((q: any) => {
            q.isMultipleSelect = q.correctOptionIds?.length > 1;
          })
          this.testData.questions = this.questions;
          this.storeLocalState();
          this.loadQuestionsInTest();
        } else {
          console.error('Failed to load test details:', resp.message); // Log the error  resp.message ?? 'Could not start test';
        }
      },
      error: err => {
        console.error('Failed to load test details:', err);
      }
    });
  }

  loadQuestionsInTest() : any {
    this.isLoadingQuestions = false;
    this.startTimer();
    this.loadSavedAnswers();
    this.startAutoSave();
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    this.cdr.detectChanges();
  }

  getQuestionsFromHub(subjectId?: number, noOfQuestions: number = 20): any {
    this.isLoadingQuestions = true;
    this.testService.drawQuestionsFromHub(subjectId, noOfQuestions).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess && resp.data) {
          this.questions = resp.data as QuestionModel[];
          this.questions.forEach((q: any) => {
            q.isMultipleSelect = q.correctOptionIds?.length > 1;
          })
          this.testData.questions = this.questions;
          this.storeLocalState();
          this.loadQuestionsInTest();
        } else {
          console.error('Failed to load test details:', resp.message); // Log the error  resp.message ?? 'Could not start test';
        }
      },
      error: err => {
        console.error('Failed to load test details:', err);
      }
    });
  }

  loadTest() {
    this.isLoadingTest = true;
    this.testService.getTest(this.testId).subscribe({
      next: (resp: any) => {
        setTimeout(() => {
          this.isLoadingTest = false;
          if (resp.isSuccess && resp.data) {
            this.testDetails = resp.data as TestDetailsModel;
            this.subjectId = this.testDetails.subjectId;
            const savedTest = this.localStorage.getItem(LocalStorageKeys.UserTests);
            if (savedTest && savedTest.activeTestId === this.testId && savedTest.activeQuestionsSet?.length > 0) {
              this.questions = savedTest.activeQuestionsSet;
              this.testData.questions = savedTest.activeQuestionsSet;
              this.loadQuestionsInTest();
            } else {
              if (this.testDetails?.AvailableQuesInHub > this.testDetails.totalQuestions)
                this.getQuestionsFromHub(this.subjectId, this.testDetails.totalQuestions);
              else
                this.loadTestQuestions();

            }

            this.timeRemaining.set(+this.testDetails?.totalQuestions * 2 * 60);
            this.questionIndexes = this.makeRange(this.testDetails?.totalQuestions);
            this.cdr.detectChanges();
          } else {
            console.error('Failed to load test details:', resp.message); // Log the error  resp.message ?? 'Could not start test';
          }
        }, 3000);
      },
      error: err => {
        console.error('Failed to load test details:', err);
      }
    });
  }

  private makeRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  windowBlurHandler = () => {
    alert('You have left the test window. Please return immediately!');
  };
  windowFocusHandler = () => {
    // Optionally, handle when they return
  };

  wasWarned = false;

  visibilityChangeHandler = () => {
    if (document.visibilityState === 'hidden') {
      // The user switched tab, minimized, or left the page
      this.showWarning();
    }
  };

  showWarning() {
    if (!this.wasWarned) {
      alert('You have switched away from the test window. Please do not leave the test screen.');
      this.wasWarned = true; // or track the count if you want to block after N times
    }
    // Optionally: Track attempts, submit test, etc.
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
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  private loadSavedAnswers(): void {
    const saved = this.localStorage.getItem(LocalStorageKeys.UserTests)?.activeAnswers;
    if (saved) {
      try {
        this.answers.set(saved);
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

  // Save answers to localStorage
  private saveAnswers(): void {
    try {
      this.storeLocalState();
    } catch (error) {
      console.error('Error saving answers:', error);
    }
  }

  private storeLocalState() : void {
    this.localStorage.setItem(LocalStorageKeys.UserTests, { activeTestId: this.testId, activeAnswers: this.answers(), activeQuestionsSet : this.questions });
  }

  // Handle single-select (radio)
  onSingleOptionSelect(questionId: number, optionValue: string): void {
    const currentAnswers = { ...this.answers() };
    currentAnswers[`question_${questionId}`] = optionValue;
    this.answers.set(currentAnswers);
    this.saveAnswers();
  }

  // Handle multiple-select (checkbox)
  onMultipleOptionSelect(questionId: number, optionValue: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const currentAnswers = { ...this.answers() };
    const answerKey = `question_${questionId}`;
    let selected = Array.isArray(currentAnswers[answerKey])
      ? [...currentAnswers[answerKey] as string[]]
      : [];

    if (checked) {
      if (!selected.includes(optionValue)) {
        selected.push(optionValue);
      }
    } else {
      selected = selected.filter(val => val !== optionValue);
    }
    currentAnswers[answerKey] = selected;
    this.answers.set(currentAnswers);
    this.saveAnswers();
  }


  // Check if an option is selected (works for single & multiple)
  isOptionSelected(questionId: number, optionValue: string): boolean {
    const answer = this.answers()[`question_${questionId}`];
    if (Array.isArray(answer)) return answer.includes(optionValue);
    return answer === optionValue;
  }

  // Helper to get "A", "B", "C", etc.
  charFromCode(index: number): string {
    return String.fromCharCode(65 + index);
  }

  fromCharCode(index: number): string {
    return String.fromCharCode(65 + index);
  }


  getDifficultyClass(difficulty: string = 'medium'): string {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return 'difficulty-medium';
    }
  }


  mapAnswersSignalToPayload(raw: AnswerSignalType): AnswerPayload {
    const answers = Object.entries(raw).map(([key, value]) => {
      // extract question id from key
      const idMatch = key.match(/^question_(\d+)$/);
      const questionId = idMatch ? +idMatch[1] : 0;

      // always store as array
      const selectedIds = Array.isArray(value) ? value : [value];

      return { questionId, selectedIds };
    });

    return { answers };
  }

  submitTest(isAutoSubmit: boolean = false): void {
    this.submittingTest = true;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const rawAnswers = this.answers();  // read the signal value
    const answers = this.mapAnswersSignalToPayload(rawAnswers);

    const questions = this.updateQuestionsWithUserAnswers(this.questions, rawAnswers);

    const payload: SubmitTestRequest = {
      testId: this.testId,
      answers: answers.answers,
      questions: questions,
      rawAnswers: this.answers(),
      submissionTime: new Date().toISOString(),
      isAutoSubmit: isAutoSubmit,
      durationCompletedIn: GetTimeSpan(getSecondsFromTimeSpan(this.testDetails?.duration) - this.timeRemaining())
    };

    this.testService.submitTestAnswers(this.testId, payload).subscribe(
      (response: any) => {
        this.isTestSubmitted.set(true);
        this.submittingTest = false;
        this.processSubmission(payload);
        this.resetTest();
        this.router.navigate(['/test/test-result', this.testId]);
      },
      (error: any) => {
        console.error('Error submitting test:', error);
      }
    )

  }

  updateQuestionsWithUserAnswers(questions: any[], selectedAnswers: any): any[] {
    return questions.map(q => {
      const selectedKey = `question_${q.id}`;
      const selectedOption = selectedAnswers[selectedKey];
  
      if (!selectedOption || selectedOption.length === 0) {
        return q; // No answer selected
      }
  
      // Convert array to CSV string if it's an array
      const selectedIds = Array.isArray(selectedOption)
        ? selectedOption.join(',')
        : selectedOption;
  
      const isCorrect = q.correctOptionIds === selectedIds;
  
      const result = {
        ...q,
        selectedOptionIds: selectedIds,
        isCorrect: isCorrect,
        answeredAt: new Date().toISOString()
      };
  
      this.storeLocalState();
      return result;
    });
  }  


  private processSubmission(submissionData: SubmitTestRequest): void {
    // Calculate score
    let score = 0;
    let correctAnswers = 0;

    if (this.testData?.questions) {
      this.testData?.questions.forEach(question => {
        const questionKey = `question_${question.id}`;
        const userAnswer = submissionData.rawAnswers[questionKey];

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


    this.result = {
      totalQuestions: this.testData?.questions?.length,
      answeredQuestions: Object.keys(submissionData.answers).length,
      correctAnswers: correctAnswers,
      score: score,
      totalMarks: this.testData.totalMarks,
      percentage: (score / (this.testData?.totalMarks ?? 1)) * 100
    };

    // alert(`Test Submitted Successfully!\n\nScore: ${score}/${this.testData.totalMarks}\nCorrect Answers: ${correctAnswers}/${this.testData?.questions?.length}\nPercentage: ${this.result.percentage.toFixed(2)}%`);
  }

  resetTest(): void {
    this.answers.set({});
    this.timeRemaining.set(40 * 60);
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

  exitTest(): void {
    this.resetTest();
    this.router.navigate(['/test']);
  }

}
