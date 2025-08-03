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

@Component({
  selector: 'app-my-tests',
  imports: [SharedModule, NgApexchartsModule, NgbModule, NgSelectModule, CommonModule, RouterModule, TestSkeletonLoader, SpkAlertsComponent],
  templateUrl: './my-tests.html',
  styleUrl: './my-tests.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTests implements OnInit {
  loading = true;
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
    
    this.usageAlerts = this.generateUsageAlerts(user?.subscriptionPlan, user?.currentUsage);

    console.log('Current User:', user);
    if (!user) {
      this.error = 'User not found. Please log in again.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.loadTests();
    this.loading = false;
    this.cdr.detectChanges();
  }

  generateUsageAlerts(subscriptionPlan?: UserSubscriptionModel, currentUsage?: UserCurrentUsageModel): any[] {

    if (!subscriptionPlan || !currentUsage) return [];

    const alerts = [];

  const dangerIcon = `<svg class="svg-danger" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"/></svg>`;
  const primaryIcon = `<svg class="svg-primary" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
  const warningIcon = `<svg class="svg-warning" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;

  if (currentUsage.activeTests > subscriptionPlan.maxActiveTests) {
    alerts.push({
      type: 'danger svg-danger custom-alert-icon shadow-sm',
      icon: dangerIcon,
      message: `You are allowed a maximum of ${subscriptionPlan.maxActiveTests} active or unfinished test(s), but currently you have ${currentUsage.activeTests}. Please finish or archive some tests.`
    });
  }

  if (subscriptionPlan.canRetryTest && currentUsage.retryAttempted >= subscriptionPlan.maxTestAttempts) {
    alerts.push({
      type: 'danger svg-danger custom-alert-icon shadow-sm',
      icon: dangerIcon,
      message: `Maximum retry attempts (${subscriptionPlan.maxTestAttempts}) reached. You have attempted retry ${currentUsage.retryAttempted} time(s).`
    });
  }

  if (currentUsage.testsCreatedPerExam > subscriptionPlan.maxTestsPerExam) {
    alerts.push({
      type: 'warning svg-warning custom-alert-icon shadow-sm',
      icon: warningIcon,
      message: `You can create only ${subscriptionPlan.maxTestsPerExam} tests per exam, but currently ${currentUsage.testsCreatedPerExam} have been created.`
    });
  }

  if (currentUsage.noOfExamsForwhichTestsGiven > subscriptionPlan.maxExams) {
    alerts.push({
      type: 'warning svg-warning custom-alert-icon shadow-sm',
      icon: warningIcon,
      message: `You are allowed to give tests for ${subscriptionPlan.maxExams} exam(s), but currently have given tests for ${currentUsage.noOfExamsForwhichTestsGiven} exam(s).`
    });
  }

  return alerts;
}

  getSanitizedSVG(svgContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }

  customizedAlertclose(index: number) {
    // Remove the alert from the array based on the index
    this.usageAlerts.splice(index, 1);
  }

  usageAlerts: any = [
    {
      type: 'primary svg-primary custom-alert-icon shadow-sm ',
      icon: '  <svg  class="svg-primary" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000" > <path d="M0 0h24v24H0z" fill="none" /> <path   d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/> </svg>',
      message: ' A customized primary alert with an icon ',

    },
    {
      type: 'secondary svg-secondary custom-alert-icon shadow-sm',
      message: 'A customized secondary alert with an icon ',
      icon: ' <svg class="svg-secondary" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
    },
    {
      type: 'warning svg-warning custom-alert-icon shadow-sm',
      message: ' A customized warning alert with an icon ',
      icon: '<svg class="svg-warning" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
    },
    {
      type: 'danger svg-danger custom-alert-icon shadow-sm',
      message: ' A customized danger alert with an icon ',
      icon: '<svg class="svg-danger" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"/></svg>'
    },
  ];

  loadTests() {
    this.error = '';
    this.testService.getTests().subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
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

