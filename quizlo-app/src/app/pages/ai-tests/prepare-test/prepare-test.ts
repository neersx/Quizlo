import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ApexChartComponent } from '../../../@spk/apex-chart/apex-chart.component';
import { SpkDropdownsComponent } from '../../../@spk/reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';
import { SpkReusableTablesComponent } from '../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../shared/sharedmodule';
import { SpkCategoriesCardComponent } from '../../../@spk/reusable-dashboards/spk-podcast-dashboard/spk-categories-card/spk-categories-card.component';
import { SpkRecommendationsCardComponent } from '../../../@spk/reusable-dashboards/spk-podcast-dashboard/spk-recommendations-card/spk-recommendations-card.component';
import { SpkShortcutCardComponent } from '../../../@spk/reusable-dashboards/spk-podcast-dashboard/spk-shortcut-card/spk-shortcut-card.component';
import { Router, RouterModule } from '@angular/router';
import { ExamService } from '../services/exam-service';
import { Exam } from '../model/questions.model';

@Component({
  selector: 'app-prepare-test',
  imports: [CommonModule, RouterModule, SharedModule,NgbDropdownModule,SpkDropdownsComponent,SpkShortcutCardComponent,SpkCategoriesCardComponent,SpkRecommendationsCardComponent,CommonModule,ApexChartComponent,
    SpkReusableTablesComponent],
  templateUrl: './prepare-test.html',
  styleUrl: './prepare-test.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrepareTest implements OnInit {
  exams: Exam[] = [];
  loading = false;
  error = '';
  constructor(private router: Router, private cdr: ChangeDetectorRef, private examService: ExamService, ) {}

  ngOnInit() {
    this.fetchExams();
  }

  fetchExams(page = 1, size = 10): void {
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
          this.cdr.markForCheck();
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
  takeTest() {
    this.router.navigate(['/test/select-exam']);
  }

  chartOptions:any = {
    series: [{
      name: 'Hours',
      data: [20, 35, 66, 40, 30, 55, 45]
    }],
    chart: {
      height: 267,
      fontFamily: 'Poppins, Arial, sans-serif',
      type: 'area',
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      borderColor: '#f2f6f7',
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      fontSize: '13px',
    },
    colors: ["var(--primary-color)"],
    stroke: {
      width: [2],
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.2,
        stops: [0, 60],
        colorStops: [
          [
            {
              offset: 0,
              color: 'var(--primary04)',
              opacity: 1
            },
            {
              offset: 60,
              color: 'var(--primary02)',
              opacity: 1
            },
            {
              offset: 100,
              color: 'rgba(121, 97, 245, 0)',
              opacity: 1
            }
          ],
        ]
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  }

  cards = [
    {
      icon: 'M223.77,150.09a8,8,0,0,1-5.86,9.68l-24.64,6,6.46,24.11a8,8,0,0,1-5.66,9.8A8.25,8.25,0,0,1,192,200a8,8,0,0,1-7.72-5.93l-7.72-28.8L136,141.86v46.83l21.66,21.65a8,8,0,0,1-11.32,11.32L128,203.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L120,188.69V141.86L79.45,165.27l-7.72,28.8A8,8,0,0,1,64,200a8.25,8.25,0,0,1-2.08-.27,8,8,0,0,1-5.66-9.8l6.46-24.11-24.64-6a8,8,0,0,1,3.82-15.54l29.45,7.23L112,128,71.36,104.54l-29.45,7.23A7.85,7.85,0,0,1,40,112a8,8,0,0,1-1.91-15.77l24.64-6L56.27,66.07a8,8,0,0,1,15.46-4.14l7.72,28.8L120,114.14V67.31L98.34,45.66a8,8,0,0,1,11.32-11.32L128,52.69l18.34-18.35a8,8,0,0,1,11.32,11.32L136,67.31v46.83l40.55-23.41,7.72-28.8a8,8,0,0,1,15.46,4.14l-6.46,24.11,24.64,6A8,8,0,0,1,216,112a7.85,7.85,0,0,1-1.91-.23l-29.45-7.23L144,128l40.64,23.46,29.45-7.23A8,8,0,0,1,223.77,150.09Z',  // Example icon path
      title: 'Chill Hits',
      subtitle: '180 Items',
      itemCount: 180,
      bgColor: 'bg-primary'
    },
    {
      icon: 'M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z',  // Example icon path
      title: 'Hop',
      subtitle: '180 Items',
      itemCount: 180,
      bgColor: 'bg-success'
    },
    {
      icon: 'M168,16A72.07,72.07,0,0,0,96,88a73.29,73.29,0,0,0,.63,9.42L27.12,192.22A15.93,15.93,0,0,0,28.71,213L43,227.29a15.93,15.93,0,0,0,20.78,1.59l94.81-69.53A73.29,73.29,0,0,0,168,160a72,72,0,1,0,0-144Zm56,72a55.72,55.72,0,0,1-11.16,33.52L134.49,43.16A56,56,0,0,1,224,88ZM54.32,216,40,201.68,102.14,117A72.37,72.37,0,0,0,139,153.86ZM112,88a55.67,55.67,0,0,1,11.16-33.51l78.34,78.34A56,56,0,0,1,112,88Zm-2.35,58.34a8,8,0,0,1,0,11.31l-8,8a8,8,0,1,1-11.31-11.31l8-8A8,8,0,0,1,109.67,146.33Z',  // Example icon path
      title: 'Jazz',
      subtitle: '180 Items',
      itemCount: 180,
      bgColor: 'bg-info'
    },
    {
      icon: 'M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z',  // Example icon path
      title: 'Acostic',
      subtitle: '180 Items',
      itemCount: 180,
      bgColor: 'bg-secondary'
    },
    {
      icon: 'M24,120v48a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM48,88a8,8,0,0,0-8,8v96a8,8,0,0,0,16,0V96A8,8,0,0,0,48,88Zm32-8a8,8,0,0,0-8,8V192a8,8,0,0,0,16,0V88A8,8,0,0,0,80,80Zm32-32a8,8,0,0,0-8,8V192a8,8,0,0,0,16,0V56A8,8,0,0,0,112,48Zm110.84,58.34A80,80,0,0,0,144,40a8,8,0,0,0,0,16,63.76,63.76,0,0,1,63.68,57.53,8,8,0,0,0,6.44,7A32,32,0,0,1,208,184H144a8,8,0,0,0,0,16h64a48,48,0,0,0,14.84-93.66Z',  // Example icon path
      title: 'Indie Pop',
      subtitle: '180 Items',
      itemCount: 180,
      bgColor: 'bg-warning'
    },
    {
      icon: 'M212.92,17.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,56V166.08A36,36,0,1,0,88,196V110.25l112-28v51.83A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.69ZM52,216a20,20,0,1,1,20-20A20,20,0,0,1,52,216ZM88,93.75V62.25l112-28v31.5ZM180,184a20,20,0,1,1,20-20A20,20,0,0,1,180,184Z',  // Example icon path
      title: 'Hip',
      subtitle: '180 Items',
      itemCount: 180,
      bgColor: 'bg-danger'
    }
  ];

  categories = [
    { icon: 'ti ti-mood-happy', label: 'Comedy', colorClass: 'btn-primary' },
    { icon: 'ti ti-news', label: 'News', colorClass: 'btn-secondary' },
    { icon: 'ti ti-slice', label: 'True Crime', colorClass: 'btn-success' },
    { icon: 'ti ti-bulb', label: 'Technology', colorClass: 'btn-orange' },
    { icon: 'ti ti-test-pipe', label: 'Science', colorClass: 'btn-info' },
    { icon: 'ti ti-book', label: 'Education', colorClass: 'btn-warning' },
    { icon: 'ti ti-ball-american-football', label: 'Sports', colorClass: 'btn-danger' },
    { icon: 'ti ti-music', label: 'Music', colorClass: 'btn-teal' }
  ];

  podcasts = [
    { imageUrl: './assets/images/media/podcast/1.jpg', title: 'Random Ramblings', author: 'Alice Mumbleton', duration: '3h 25m', plays: 15352 },
    { imageUrl: './assets/images/media/podcast/2.jpg', title: 'Mindless Musings', author: 'Bob Jibberish', duration: '3h 25m', plays: 15352 },
    { imageUrl: './assets/images/media/podcast/3.jpg', title: 'Chatterbox Chronicles', author: 'Charlie Babbleworth', duration: '3h 25m', plays: 15352 },
    { imageUrl: './assets/images/media/podcast/4.jpg', title: 'Whimsical Whispers', author: 'Fiona Jargonova', duration: '3h 25m', plays: 15352 },
    { imageUrl: './assets/images/media/podcast/5.jpg', title: 'The Beach Boys', author: 'Pop Rock', duration: '3h 25m', plays: 15352 },
    { imageUrl: './assets/images/media/podcast/6.jpg', title: 'The Rolling Stones', author: 'Blues Rock', duration: '3h 25m', plays: 15352 }
  ];

  PlayedData = [
    {
      title: 'Tech Talk',
      host: 'John Smith',
      image: './assets/images/media/podcast/1.jpg',
      plays: 10005,
      duration: '45 Mins'
    },
    {
      title: 'Science Explorers',
      host: 'Emily Johnson',
      image: './assets/images/media/podcast/7.jpg',
      plays: 111374,
      duration: '30 Mins'
    },
    {
      title: 'Business Insights',
      host: 'David Williams',
      image: './assets/images/media/podcast/8.jpg',
      plays: 10742,
      duration: '60 Mins'
    },
    {
      title: 'Ransom Riblings',
      host: 'Alish Floana',
      image: './assets/images/media/podcast/4.jpg',
      plays: 3637,
      duration: '60 Mins'
    },
    {
      title: 'Health and Wellness',
      host: 'Michael Brown',
      image: './assets/images/media/podcast/3.jpg',
      plays: 2575,
      duration: '50 Mins'
    }
  ];
}
