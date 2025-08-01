import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from '../../../utils/localstorage/localstorage.service';
import { TestDetailsModel } from '../../ai-tests/model/tests.model';
import { TestService } from '../../ai-tests/services/test-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../../shared/sharedmodule';
import { TestSkeletonLoader } from '../../ai-tests/test-skeleton-loader/test-skeleton-loader';

@Component({
  selector: 'app-user-tests',
  imports: [SharedModule, NgApexchartsModule, NgbModule, NgSelectModule, CommonModule, RouterModule, TestSkeletonLoader],
  templateUrl: './user-tests.html',
  styleUrl: './user-tests.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTestsComponent implements OnInit {
  loading = false;
  loadingTest = false;
  testDetails: TestDetailsModel | undefined;
  tests: any[] = [];
  activeTests: any[] = [];
  error = '';

  constructor(private cdr: ChangeDetectorRef,
    private testService: TestService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.loadTests();
    this.cdr.detectChanges();
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

  onIconError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '../assets/images/exams/icons/exam.png';
    this.cdr.markForCheck();
  }
}
