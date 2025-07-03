import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/sharedmodule';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../services/test-service';
import { TestDetailsModel } from '../model/tests.model';
import { QuestionModel } from '../model/questions.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TestWindow } from '../test-window/test-window';
import { AuthService } from '../../../services/identity/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-live-test',
  imports: [SharedModule, NgbTooltipModule, FormsModule, CommonModule, TestWindow],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './live-test.html',
  styleUrl: './live-test.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveTest {
  thumbsSwiper: any;
  canLoadQuestions = false;
  testDetails: TestDetailsModel = {
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

  questions: QuestionModel[] = [];
  isLoadingQuestions = false;
  error: string = '';
  payload: any = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const examId = Number(params['examId']);
      const language = params['language'];
      const code = params['code'];
      const examName = params['examName'];
      const subject = params['subject'];
      const difficulty = params['difficulty'];

      this.testDetails = { ...this.testDetails, examCode: code, examName, language, subject, difficulty, examId };

      if (!examId || !language) {
        this.error = 'Missing examId or language';
        return;
      }

      // if (isPlatformBrowser(this.platformId)) {
      //   const currentUser = localStorage.getItem('current_user');
      //   if (!currentUser) {
      //     alert('You are not logged in');
      //     const returnUrl = this.router.url;
      //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl } });
      //     return;
      //   }
      // }

      this.createAndNavigateToTest(examId, language, code, examName, subject, difficulty);
      this.cdr.markForCheck();
    });
  }

  private createAndNavigateToTest(examId: number, language: string, examCode: string = '', examName: string = '', subject: string = 'All', difficulty: number = 3) {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
    // e.g. "28/06/2025"
    const title = `${examCode}-${formatted.replace(/\//g, '-')} Mock Test`;

    this.payload = {
      examId,     // adjust as needed
      subject,       // or your dynamic subject
      language,
      examCode,
      examName,
      difficulty: 1,              // use your enum: 0 = Easy, 1 = Medium, 2 = Hard 3 = Mix  etc.
      title,      // or build from exam name
      duration: '00:00:00'        // e.g. HH:MM:SS
    };

    this.loadTest(this.payload);
  }

  loadTest(payload: any) {
    this.isLoadingQuestions = true;
    this.testService.createTest(payload).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess && resp.data) {
          this.testDetails = resp.data as TestDetailsModel;
          // Optional: Parse Options from optionsJson for each question
          this.questions = (this.testDetails?.questions || []).map((q: any) => ({
            ...q,
            options: q.options
          }));
          this.isLoadingQuestions = false;
          console.log('Test Details:', this.testDetails);
          console.log('Questions:', this.questions);
          this.cdr.detectChanges();
        } else {
          this.error = resp.message ?? 'Could not start test';
        }
      },
      error: err => {
        this.error = err.message || 'Server error';
      }
    });
  }

  convertDurationToText(duration: string | undefined): string {
    if (!duration) {
      return '';
    }
  
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const parts: string[] = [];
  
    if (hours > 0) {
      parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    }
    if (seconds > 0 && hours === 0) {
      // usually seconds are not shown if hours exist
      parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
    }
  
    return parts.join(' ');
  }
  

  startTestNow() {
    this.isLoadingQuestions = true;
    setTimeout(() => {
      this.canLoadQuestions = true;
      this.isLoadingQuestions = false;
      this.cdr.detectChanges();
    }, 3000);
    this.cdr.markForCheck();
  }

  // Helper to parse options from JSON string
  parseOptions(optionsJson: string): string[] {
    try {
      return JSON.parse(optionsJson);
    } catch {
      return [];
    }
  }

  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }


  ngAfterViewInit(): void {

  }

}

