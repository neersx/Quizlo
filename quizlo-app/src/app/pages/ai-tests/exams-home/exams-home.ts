import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/sharedmodule';
import { OptionModel, SpkNgSelectComponent } from '../../../@spk/reusable-ui-elements/spk-ng-select/spk-ng-select.component';
import { Exam } from '../model/questions.model';
import { ExamService } from '../services/exam-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DropdownService } from '../../../services/dropdown.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../utils/localstorage/localstorage.service';
import { LocalStorageKeys } from '../../../utils/localstorage/localstorage-keys';
import { Dropdown } from '../../../models/dropdown.model';
import { SpkDropdownsComponent } from '../../../@spk/reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';
import { TestService } from '../services/test-service';
import { TestDetailsModel } from '../model/tests.model';
import { AuthService } from '../../../services/identity/auth.service';
import { TestSkeletonLoader } from '../test-skeleton-loader/test-skeleton-loader';
import { RegisterModal } from '../../identity/register-modal/register-modal';
import { NgbModal, NgbModalOptions, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridLoader } from '../../../shared/common/loaders/grid-loader/grid-loader';

@Component({
  selector: 'app-exams-home',
  imports: [SharedModule, NgApexchartsModule, NgbModule, NgSelectModule, SpkNgSelectComponent, SpkDropdownsComponent,
    CommonModule, RouterModule, TestSkeletonLoader, RegisterModal, GridLoader],
  templateUrl: './exams-home.html',
  styleUrl: './exams-home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamsHome implements OnInit {
  selectedLanguage: OptionModel = { label: 'English', value: 'English' };
  isSubjectsLoading = false;
  selectedDifficulty = { label: 'Mix', value: 'Mix' };
  selectedSubject: OptionModel = { label: 'All', value: 'All' };
  selectedExam: any | null = null;
  exams: Exam[] = [];
  subjects: Dropdown[] = [];
  languages: any[] = [];
  loading = false;
  loadingTest = false;
  testDetails: TestDetailsModel | undefined;
  tests: any[] = [];
  activeTests: any[] = [];
  error = '';

  constructor(private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private examService: ExamService,
    private router: Router,
    private testService: TestService,
    private userService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService,
    private dropdownService: DropdownService) { }

  ngOnInit() {
    this.fetchLanguageDropdown();
    this.fetchExams();
    this.initializeDefaultValues();

    this.cdr.detectChanges();
  }

  initializeDefaultValues() {
    this.selectedLanguage = { label: 'English', value: 'English' };
    this.selectedDifficulty = { label: 'Mix', value: 'Mix' };
    this.selectedSubject = { label: 'All', value: 'All' };
    const userpreference: any = this.localStorageService.getItem(LocalStorageKeys.UserPreferences);

    if (userpreference && userpreference.defaultExam) {
      const exam = userpreference.defaultExam;
      this.selectedExam = { label: exam.label, name: exam.name, value: exam.value, code: exam.code };
      this.subjects = userpreference.examSubjects ?? [];
    }
    // this.loadTests();

    this.cdr.markForCheck();
  }

  difficultyOptions = [
    { label: 'Easy', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'Hard', value: 2 },
    { label: 'Mix', value: 3 }
  ];

  gridColumns = [

    { type: 'text' as const, width: 55 },
    { type: 'text' as const, width: 25 },

  ];

  getActiveTests() {
    return this.userService.getUserActiveTests().subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.activeTests = resp.data;
          this.cdr.detectChanges();
        } else {
          this.error = resp.message ?? 'Failed to load tests';
        }
      },
      error: (err: any) => {
        this.error = err.message || 'Server error';
      },
      complete: () => {
        this.loadingTest = false;
      }
    })
  }

  loadTests() {
    this.error = '';
    this.testService.getTests().subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.tests = resp.data.filter((test: any) => test.status == 'Not Started');
          this.cdr.detectChanges();
        } else {
          this.error = resp.message ?? 'Failed to load tests';
        }
      },
      error: err => {
        this.error = err.message || 'Server error';
      },
      complete: () => {

      }
    });
  }

  fetchLanguageDropdown() {
    this.dropdownService.getLanguagesDropdown().subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.languages = resp.data;
        } else {
          this.error = resp.message ?? 'Failed to load exams';
        }
      },
      error: err => {
        this.error = err.message || 'Server error';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  fetchExams(page = 1, size = 1000): void {
    this.loading = true;
    this.error = '';
    this.examService.getExams(page, size).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.exams = resp.data.map((exam: any) => ({
            label: `${exam.code} - ${exam.name}`, name: exam.name,
            value: exam.id!,
            code: exam.code
          }));
          this.loading = false;
          this.cdr.detectChanges();
        } else {
          this.error = resp.message ?? 'Failed to load exams';
        }
      },
      error: err => {
        this.error = err.message || 'Server error';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


  startTest() {
    if (this.tests.length > 0) {
      return;
    }
    this.loadingTest = true;
    if (!this.selectedExam || !this.selectedSubject) {
      this.loadingTest = false;
      return;
    }
    setTimeout(() => {

      if (this.isUserLoggedIn()) {
        const payload = this.getPayload();
        this.loadTest(payload);
      } else {
        this.OpenRegisterModal();
      }
      this.loadingTest = false;
      this.cdr.markForCheck();
    }, 2000);

    this.error = '';

  }

  OpenRegisterModal() {
    const modalRef = this.modalService.open(RegisterModal, this.modalOptions);
  
    modalRef.closed.subscribe((result: any) => {
      console.log('Closed with:', result);
    });
  
    // fires only when .dismiss(...) is called, or ESC/backdrop
    modalRef.dismissed.subscribe((reason: any) => {
      console.log('Dismissed with:', reason);
    });
  }

  modalOptions: NgbModalOptions = {
    centered: true
  };

  isUserLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
      return !!currentUser;
    }
    return false;
  }

  private getPayload() {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    // e.g. "28/06/2025"
    const title = `${this.selectedExam.code}${formatted.replace(/\//g, '-')} Mock Test`;

    const payload = {
      examId: this.selectedExam.value,     // adjust as needed
      subject: this.selectedSubject.label,       // or your dynamic subject
      language: this.selectedLanguage.label,
      examCode: this.selectedExam.code,
      examName: this.selectedExam.name,
      difficulty: 1,              // use your enum: 0 = Easy, 1 = Medium, 2 = Hard 3 = Mix  etc.
      title,      // or build from exam name
      duration: '00:00:00'        // e.g. HH:MM:SS
    };

    return payload;
  }

  loadTest(payload: any) {
    this.testService.createInitialTest(payload).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess && resp.data) {
          this.testDetails = resp.data as TestDetailsModel;
          this.router.navigate(['/test/live-test/' + this.testDetails.id]);
        } else {
          this.error = resp.message ?? 'Could not start test';
        }
      },
      error: err => {
        this.error = err.message || 'Server error';
      }
    });
  }


  handleLanguageChange(value: any | any[]) {
    console.log(value);
    this.selectedLanguage = value;
    console.log(this.selectedLanguage, 'selected language');
  }

  handleExamChange(value: any | any[]) {
    this.isSubjectsLoading = true;
    this.selectedExam = value;
    if (this.selectedExam) {
      this.examService.getSubjectsByExamId(+this.selectedExam.value)
        .subscribe({
          next: (subjects: any) => {
            this.subjects = subjects;
            this.localStorageService.setItem(LocalStorageKeys.UserPreferences, { defaultExam: value, examSubjects: subjects });
            this.isSubjectsLoading = false;
            this.cdr.markForCheck();
          },
          error: () => {
            this.subjects = [];
            this.isSubjectsLoading = false;
          }
        });
    } else {
      this.subjects = [];
    }
    this.cdr.markForCheck();
  }

  handleSubjectChange(value: any | any[]) {
    this.selectedSubject = value;
  }

  handleDifficultyChange(event: any) {
    this.selectedDifficulty = event; // or event.value if single-select
  }

  // fallback handler
  onIconError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '../assets/images/exams/icons/exam.png';
    this.cdr.markForCheck();
  }
}
