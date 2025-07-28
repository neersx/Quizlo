import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../../shared/sharedmodule';
import { TestSkeletonLoader } from '../test-skeleton-loader/test-skeleton-loader';
import { TestDetailsModel } from '../model/tests.model';
import { TestService } from '../services/test-service';
import { GetCssClassByStatus } from '../../../utils/helpers/css-class-by-status';

@Component({
  selector: 'app-my-tests',
  imports: [SharedModule, NgApexchartsModule, NgbModule, NgSelectModule, CommonModule, RouterModule, TestSkeletonLoader],
  templateUrl: './my-tests.html',
  styleUrl: './my-tests.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTests implements OnInit {
  loading = false;
  loadingTest = false;
  testDetails: TestDetailsModel | undefined;
  tests: any[] = [];
  activeTests: any[] = [];
  error = '';

  constructor(private cdr: ChangeDetectorRef,
    private testService: TestService) { }

  ngOnInit() {
    this.loadTests();
    this.cdr.detectChanges();
  }

  loadTests() {
    this.error = '';
    this.testService.getTests().subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.tests = resp.data.map((x: any) => {
            const percentage = x?.totalMarks === 0
              ? 0
              : Math.round((x.marksScored * 100) / x.totalMarks * 100) / 100;
          
            return {
              ...x,
              status: x.status === 'Completed'
                ? (percentage > 70 ? 'Passed' : 'Failed')
                : x.status
            };
          });
          
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

  getStatusClass(status: string): string {
    return GetCssClassByStatus(status);
  }


  onIconError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '../assets/images/exams/icons/exam.png';
    this.cdr.markForCheck();
  }
}

