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
import { LocalStorageService } from '../../../utils/localstorage/localstorage.service';
import { LocalStorageKeys } from '../../../utils/localstorage/localstorage-keys';
import { SpkAlertsComponent } from '../../../@spk/reusable-ui-elements/spk-alerts/spk-alerts.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SubscriptionModel, UserCurrentUsageModel, UserSubscriptionModel } from '../../../models/subscription.model';
import { GenerateUsageAlerts } from '../../../utils/helpers/usage-alerts';

@Component({
  selector: 'app-my-tests',
  imports: [SharedModule, NgApexchartsModule, NgbModule, NgSelectModule, CommonModule, RouterModule, TestSkeletonLoader, SpkAlertsComponent],
  templateUrl: './my-tests.html',
  styleUrl: './my-tests.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTests implements OnInit {
  loading = true;
  usageAlerts: any[] = [];
  loadingTest = false;
  testDetails: TestDetailsModel | undefined;
  tests: any[] = [];
  activeTests: any[] = [];
  error = '';

  constructor(private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private readonly localStorageService: LocalStorageService,
    private testService: TestService) { }

  ngOnInit() {
    const user = this.localStorageService.getItem(LocalStorageKeys.CurrentUser)?.user; 
    this.usageAlerts = GenerateUsageAlerts(user?.subscriptionPlan, user?.currentUsage);

    if (!user) {
      this.error = 'User not found. Please log in again.';
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }
    this.loadTests();
    this.cdr.markForCheck();
  }

  
  getSanitizedSVG(svgContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }

  customizedAlertclose(index: number) {
    // Remove the alert from the array based on the index
    this.usageAlerts.splice(index, 1);
  }

  loadTests() {
    this.error = '';
    this.testService.getTests().subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.loading = false;
          this.tests = resp.data.map((x: any) => {
            const percentage = x?.totalMarks === 0
              ? 0
              : Math.round((x.marksScored * 100) / x.totalMarks * 100) / 100;
            this.cdr.detectChanges();
            return {
              ...x,
              status: x.status === 'Completed'
                ? (percentage > 70 ? 'Passed' : 'Failed')
                : x.status
            };
          });

        } else {
          this.error = resp.message ?? 'Failed to load tests';
        }
      },
      error: err => {
        this.error = err.message || 'Server error';
      },
      complete: () => {
        this.loading = false;
        console.log('Loading complete');
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

