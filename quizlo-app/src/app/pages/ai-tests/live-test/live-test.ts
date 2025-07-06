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
  testId = 0;
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
    const idParam = this.route.snapshot.paramMap.get('id');
    this.testId = idParam !== null ? +idParam : NaN;
    if (this.testId) {
      this.loadTestDetails();
    }
  }


  loadTestDetails() {
    this.testService.getTest(this.testId).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess && resp.data) {
          this.testDetails = resp.data as TestDetailsModel;
          console.log('Test Details:', this.testDetails);
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
      this.router.navigate(['/test/test-window', this.testId]);
      this.cdr.detectChanges();
    }, 1000);
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

