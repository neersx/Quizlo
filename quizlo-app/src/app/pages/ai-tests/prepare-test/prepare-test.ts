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
  changeDetection: ChangeDetectionStrategy.Default
})
export class PrepareTest implements OnInit {
  exams: Exam[] | undefined;
  loading = false;
  error = '';
  constructor(private router: Router, private cdr: ChangeDetectorRef, private examService: ExamService, ) {}

  ngOnInit() {
    this.fetchExams();
  }

  fetchExams(page = 1, size = 4): void {
    this.loading = true;
    this.error = '';
    this.examService.getExams(page, size).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          const colorClasses = [
            'card-bg-primary',
            'card-bg-success',
            'card-bg-warning',
            'card-bg-danger',
            'card-bg-info',
            'card-bg-secondary'
          ];
          this.exams = resp.data.map((exam: Exam) => ({
            ...exam,
            cssClass: colorClasses[Math.floor(Math.random() * colorClasses.length)]
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
        this.cdr.markForCheck();
      }
    });
  }
  takeTest() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/test/select-exam']);
      this.loading = false;
    }, 1000);
  }

  categories = [
    { icon: 'ti ti-pencil', label: 'Exam Tips', colorClass: 'btn-primary' },
    { icon: 'ti ti-file-text', label: 'Exams Insights', colorClass: 'btn-secondary' },
    { icon: 'ti ti-clock', label: 'Mock Tests', colorClass: 'btn-success' },
    { icon: 'ti ti-briefcase', label: 'Career Guidance', colorClass: 'btn-info' },
    { icon: 'ti ti-cpu', label: 'Technology', colorClass: 'btn-warning' },
    { icon: 'ti ti-rocket', label: 'Career', colorClass: 'btn-pink' }
  ];
  

  blogs = [
    {
      title: "Effective Exam Preparation Techniques",
      urlName:"effective-exam-preparation",
      description: "Discover proven methods to maximize your study time and improve your performance in competitive exams.",
      image: "https://www.sameeraggarwallawclasses.com/wp-content/uploads/2024/06/Ace-Your-Exams-With-Effective-Strategies-from-Top-Performers.jpg",
      author: "Quizlo Ai",
      date: "01, Jul 2025 - 09:00",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass:'p-3 pb-0 rounded-5',
      imageClass:'rounded-3',
      textColor:'primary',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/effective-exam-preparation"
    },
    {
      title: "Cracking NEET: Tips from Toppers",
      urlName:"cracking-neet-tips",
      description: "Gain valuable insights and strategies directly from NEET toppers to enhance your exam readiness.",
      image: "https://blogcdn.aakash.ac.in/wordpress_media/2025/04/5-Study-Tips-from-NEET-Toppers-1.png",
      author: "Quizlo Ai",
      date: "28, Jun 2025 - 15:00",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass:'p-3 pb-0 rounded-5',
      imageClass:'rounded-3',
      textColor:'success',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/cracking-neet-tips"
    },
    {
      title: "AI in Education: Transforming Exam Preparation",
      urlName:"ai-in-education",
      description: "Explore how artificial intelligence is revolutionizing the educational landscape, making learning smarter and more efficient.",
      image: "https://miro.medium.com/v2/resize:fit:1024/1*5Kais5SIlrU8ZmBfH5cSEw.jpeg",
      author: "Quizlo Ai",
      date: "25, Jun 2025 - 11:30",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass:'p-3 pb-0 rounded-5',
      imageClass:'rounded-3',
      textColor:'info',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/ai-in-education"
    },
    {
      title: "Stay Motivated During Exam Preparation",
      urlName:"stay-motivated-exam-prep",
      description: "Learn techniques to maintain motivation and effectively manage stress during your exam preparation journey.",
      image: "https://vishalcpaprep.com/cdn/shop/articles/motivated_1445x.jpg?v=1695042093",
      author: "Quizlo Ai",
      date: "22, Jun 2025 - 14:45",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass:'p-3 pb-0 rounded-5',
      imageClass:'rounded-3',
      textColor:'warning',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/stay-motivated-exam-prep"
    }
  ];

 
}
