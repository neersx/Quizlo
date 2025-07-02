import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/sharedmodule';
import { SpkNgSelectComponent } from '../../../@spk/reusable-ui-elements/spk-ng-select/spk-ng-select.component';
import { Exam } from '../model/questions.model';
import { ExamService } from '../services/exam-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DropdownService } from '../../../services/dropdown.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../utils/localstorage/localstorage.service';
import { LocalStorageKeys } from '../../../utils/localstorage/localstorage-keys';

@Component({
  selector: 'app-exams-home',
  imports: [SharedModule,NgApexchartsModule,NgSelectModule,SpkNgSelectComponent, CommonModule, RouterModule],
  templateUrl: './exams-home.html',
  styleUrl: './exams-home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamsHome implements OnInit {
  selectedLanguage = 'English'; 
  isSubjectsLoading = false;
  selectedDifficulty = { label: 'Mix', value: 'Mix' };
  selectedSubject = '';
  selectedExam: any | null = null;
  exams: Exam[] = [];
  subjects: any[] = [];
  languages: any[] = [];
  loading = false;
  loadingTest = false;
  error = '';

  constructor(private cdr: ChangeDetectorRef, 
    private examService: ExamService,  private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService,
    private dropdownService: DropdownService) {}

  ngOnInit() {
    this.fetchLanguageDropdown();
    this.fetchExams();
    this.initializeDefaultValues();
    this.cdr.detectChanges(); 
  }

  initializeDefaultValues() {
    this.selectedLanguage = 'English';
    this.selectedDifficulty = { label: 'Mix', value: 'Mix' };
    this.selectedSubject = 'All';
    const exam: any = this.localStorageService.getItem(LocalStorageKeys.UserPreferences);
   
    if (exam && exam.defaultExam) {
      this.selectedExam = { label: exam.defaultExam.label, name: exam.defaultExam.name, value: exam.defaultExam.value, code: exam.defaultExam.code };
    }

    this.cdr.markForCheck(); 
  }

  difficultyOptions = [
    { label: 'Easy', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'Hard', value: 2 },
    { label: 'Mix', value: 3 }
  ];

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
    this.loadingTest = true;
    setTimeout(() => {

      if(this.isUserLoggedIn()) {
        this.router.navigate(['/test/live-test'], {
          queryParams: { examName: `${this.selectedExam.name}`, code: `${this.selectedExam.code}`, examId: this.selectedExam.value, language: this.selectedLanguage, subject: this.selectedSubject, difficulty: this.selectedDifficulty.value ?? 3 }
        });
      } else {
        this.router.navigate(['/auth/login'], {
          queryParams: { returnUrl: this.router.url }
        });
      }
      this.loadingTest = false;
      this.cdr.markForCheck();
    }, 2000);

    this.error = '';
   
  }

  isUserLoggedIn() : boolean {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
      return !!currentUser;
    }
    return false;
  }

  handleLanguageChange(value: any | any[]) {
    console.log(value);
    this.selectedLanguage = value.value;
  } 

  handleExamChange(value: any | any[]) {
    this.isSubjectsLoading = true;
    this.selectedExam = value;
    this.localStorageService.setItem(LocalStorageKeys.UserPreferences, {defaultExam: value});
    if (this.selectedExam) {
      this.examService.getSubjectsByExamId(+this.selectedExam.value)
      .subscribe({
        next: (subjects: any) => {
          this.subjects = subjects;
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
    console.log(value);
    this.selectedSubject = value.value;
  }

  handleDifficultyChange(event: any) {
    this.selectedDifficulty = event; // or event.value if single-select
  }
}
