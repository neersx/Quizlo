import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/sharedmodule';
import { SpkNgSelectComponent } from '../../../@spk/reusable-ui-elements/spk-ng-select/spk-ng-select.component';
import { Exam } from '../model/questions.model';
import { ExamService } from '../services/exam-service';
import { CommonModule } from '@angular/common';
import { DropdownService } from '../../../services/dropdown.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exams-home',
  imports: [SharedModule,NgApexchartsModule,NgSelectModule,SpkNgSelectComponent, CommonModule, RouterModule],
  templateUrl: './exams-home.html',
  styleUrl: './exams-home.scss'
})
export class ExamsHome implements OnInit {
  selectedLanguage = 'English'; 
  selectedExam = '';
  exams: Exam[] = [];
  languages: any[] = [];
  loading = false;
  error = '';

  constructor(private examService: ExamService,  private router: Router, private dropdownService: DropdownService) {}

  ngOnInit() {
    this.fetchLanguageDropdown();
    this.fetchExams();
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

  fetchExams(page = 1, size = 10): void {
    this.loading = true;
    this.error = '';
    this.examService.getExams(page, size).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.exams = resp.data.map((exam: any) => ({
            label: `${exam.code} - ${exam.name}`, name: exam.name,
            value: exam.id!
          }));
          console.log(this.exams);
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
    this.loading = true;
    this.error = '';
    this.router.navigate(['/test/live-test'], {
      queryParams: { examId: this.selectedExam, language: this.selectedLanguage }
    });
  }

  handleLanguageChange(value: any | any[]) {
    console.log(value);
    this.selectedLanguage = value.value;
  } 

  handleExamChange(value: any | any[]) {
    console.log(value);
    this.selectedExam = value.value;
  }
}
