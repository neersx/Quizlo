import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SpkReusableTablesComponent } from '../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../shared/sharedmodule';
import { GalleryModule, Image } from '@ks89/angular-modal-gallery';
import { SpkNftCardComponent } from '../../../@spk/reusable-apps/spk-nft-card/spk-nft-card.component';
import { ApexChartComponent } from '../../../@spk/apex-chart/apex-chart.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../services/test-service';
import { TestDetailsModel } from '../model/tests.model';
import { CommonModule } from '@angular/common';
import { TestSkeletonLoader } from '../test-skeleton-loader/test-skeleton-loader';

@Component({
  selector: 'app-test-result',
  imports: [CommonModule, SharedModule, GalleryModule, NgbTooltipModule, SpkNftCardComponent, SpkReusableTablesComponent, ApexChartComponent, TestSkeletonLoader],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './test-result.html',
  styleUrl: './test-result.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestResult implements AfterViewInit, OnInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  testResult: TestDetailsModel | undefined;
  durationRaw = '00:40:00';            // ← from your API
  durationFormatted = '';
  percentage: any;
  isLoading = true;
  dotsConfig!: false;
  testId = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.testId = idParam !== null ? +idParam : NaN;

  }

  ngOnInit(): void {
    if (!this.testId) return;
    this.getTestResultDetails(this.testId);
    this.cdr.markForCheck();
  }

  getTestResultDetails(id: number) {
    this.testService.getTestResult(id).subscribe((result: any) => {

      if(result.isSuccess)
      {
        this.testResult = result.data;
        this.durationFormatted = this.formatDuration(this.durationRaw);
        if (this.testResult && this.testResult.marksScored && this.testResult.totalMarks) {
          this.percentage = +((this.testResult.marksScored / this.testResult.totalMarks) * 100).toFixed(0);
        } else {
          this.percentage = 0;
        }
        this.loadChart();
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    })
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

loadChart() {
  this.chartOptions1.series = [this.percentage?? 0];
  // this.chartOptions1.labels = [this.percentage  ?? 0];
  this.cdr.markForCheck();
}

takeNewTest() {
  this.router.navigate(['/test/select-exam']);
}

takeTestAgain() {
  this.router.navigate(['/test/test-window/' + this.testResult?.id]);
}

private formatDuration(dur: string): string {
  const [h, m, s] = dur.split(':').map(v => parseInt(v, 10));
  const hrs = h.toString().padStart(2, '0');
  const mins = m.toString();         // you can padStart if you like
  const secs = s.toString();
  return `${hrs}hrs : ${mins}m : ${secs}s`;
}

  chartOptions1: any = {
    chart: {
      height: 295,
      type: 'radialBar',
      responsive: 'true',
      offsetX: 0,
      offsetY: 15,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        size: 120,
        imageWidth: 50,
        imageHeight: 50,
        track: {
          strokeWidth: '97%',
          // strokeWidth: "0",
        },
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          bottom: 0,
          blur: 3,
          opacity: 0.5
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 30,
          },
          hollow: {
            size: "60%"
          },
          value: {
            offsetY: -10,
            fontSize: '22px',
            color: undefined,
            formatter: function (val: any) {
              return val + "%";
            }
          }
        }
      }
    },
    colors: ['var(--primary-color)'],
    fill: {
      type: "solid",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: .5,
        gradientToColors: ["#b94eed"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      dashArray: 3
    },
    series: [10],
    labels: ["Marks"]
  }
}
