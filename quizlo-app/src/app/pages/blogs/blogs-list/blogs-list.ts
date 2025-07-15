import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { SpkBlogImageCardComponent } from '../../../@spk/reusable-pages/spk-blog-image-card/spk-blog-image-card.component';
import { SharedModule } from '../../../shared/sharedmodule';
import { BlogModel, BlogService } from '../blogs.service';
import { CommonModule } from '@angular/common';
import { GridLoader } from '../../../shared/common/loaders/grid-loader/grid-loader';
import { TruncateWordsPipe } from '../../../utils/pipes/truncate-words.pipe';

@Component({
  selector: 'app-blogs-list',
  imports: [CommonModule, TruncateWordsPipe, SharedModule,RouterModule,CarouselModule,SpkBlogImageCardComponent, GridLoader], 
  templateUrl: './blogs-list.html',
  styleUrl: './blogs-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsList implements OnInit {
  blogsList: BlogModel[] = [];
  featuredBlogs : BlogModel[] = [];
  customOptions: OwlOptions = {
    loop: true,
    rtl: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 8000,
    autoplay: true,
    autoplayTimeout: 5000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  activeSlides!: SlidesOutputData;
  loading: boolean = false;
  columns : any = [
    { type: 'image', width: 40 },
    { type: 'image', width: 20 },
    { type: 'image', width: 20 },
    { type: 'action', width: 15 },
    { type: 'date', width: 30 }
  ];
  constructor( private cdr: ChangeDetectorRef, private service: BlogService) {}

  ngOnInit(): void {
    this.getBlogs();
    this.getPassedData(this.activeSlides);
    this.cdr.markForCheck();
  }

  getBlogs() {
    this.loading = true;
    return this.service.getBlogs().subscribe((data) => {
      this.blogsList = data.filter((blog) => !blog.isFeatured);
      this.featuredBlogs = data.filter((blog) => blog.isFeatured);
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  slidesStore: any[] = [
    {
      src: 'https://nationaltestprep.org/wp-content/uploads/2024/01/A_digital_illustration_of_a_student_standing_confide_00f0570a-9c78-47d7-a07a-81e20c3e2232-1080x614.webp',
    },
    {
      src: 'https://nationaltestprep.org/wp-content/uploads/2024/01/A_digital_illustration_of_a_student_standing_confide_00f0570a-9c78-47d7-a07a-81e20c3e2232-1080x614.webp',
    },
  ];

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    this.cdr.detectChanges();
  }

  categories = [
    {
      name: "Exam Preparation Tips",
      code: "exam-prep-tips",
      icon: "ri-book-open-fill",
      badgeClass: "badge bg-primary-transparent",
      count: 25,
      iconBg: "bg-primary",
    },
    {
      name: "Entrance Exams Insights",
      code: "exam-insights",
      icon: "ri-file-list-3-fill",
      badgeClass: "badge bg-success-transparent",
      count: 40,
      iconBg: "bg-success",
    },
    {
      name: "Mock Tests & Quizzes",
      code: "mock-tests",
      icon: "ri-pencil-fill",
      badgeClass: "badge bg-info-transparent",
      count: 55,
      iconBg: "bg-info",
    },
    {
      name: "Subject-Specific Guides",
      code: "subject-guides",
      icon: "ri-lightbulb-flash-fill",
      badgeClass: "badge bg-secondary-transparent",
      count: 34,
      iconBg: "bg-secondary",
    },
    {
      name: "Career Guidance",
      code: "career-guidance",
      icon: "ri-user-star-fill",
      badgeClass: "badge bg-warning-transparent",
      count: 20,
      iconBg: "bg-warning",
    },
    {
      name: "Technology & Learning",
      code: "tech-learning",
      icon: "ri-computer-fill",
      badgeClass: "badge bg-dark-transparent",
      count: 18,
      iconBg: "bg-dark",
    },
    {
      name: "Motivation & Inspiration",
      code: "motivation",
      icon: "ri-award-fill",
      badgeClass: "badge bg-danger-transparent",
      count: 22,
      iconBg: "bg-danger",
    },
    {
      name: "Exam Notifications",
      code: "exam-alerts",
      icon: "ri-notification-4-fill",
      badgeClass: "badge bg-purple-transparent",
      count: 27,
      iconBg: "bg-purple",
    },
    {
      name: "Quizlo Ai Tutorials",
      code: "quizlo-tutorials",
      icon: "ri-robot-fill",
      badgeClass: "badge bg-orange-transparent",
      count: 30,
      iconBg: "bg-orange",
    },
    {
      name: "Career Opportunities",
      code: "career-opps",
      icon: "ri-briefcase-4-fill",
      badgeClass: "badge bg-info-transparent",
      count: 12,
      iconBg: "bg-secondary",
    }
  ];
  
}
