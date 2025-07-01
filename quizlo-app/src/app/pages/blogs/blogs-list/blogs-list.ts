import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { SpkBlogImageCardComponent } from '../../../@spk/reusable-pages/spk-blog-image-card/spk-blog-image-card.component';
import { SharedModule } from '../../../shared/sharedmodule';

@Component({
  selector: 'app-blogs-list',
  imports: [SharedModule,RouterModule,CarouselModule,SpkBlogImageCardComponent], 
  templateUrl: './blogs-list.html',
  styleUrl: './blogs-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsList implements OnInit {
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

  constructor( private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPassedData(this.activeSlides);
    this.cdr.markForCheck();
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

  blogPosts1 = [
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
  

  comments = [
    {
      avatar: "./assets/images/media/blog/5.jpg",
      name: "Isabella Thomas",
      message: "From dense forests to expansive deserts",
      timestamp: "26, Mar 2024 - 15:37"
    },
    {
      avatar: "./assets/images/media/blog/6.jpg",
      name: "Justin Roy",
      message: "Rivers, lakes, and oceans",
      timestamp: "25, Mar 2024 - 14:20"
    },
    {
      avatar: "./assets/images/media/blog/8.jpg",
      name: "Emily Davis",
      message: "The relationship between plants and animals",
      timestamp: "24, Mar 2024 - 12:45"
    },
    {
      avatar: "./assets/images/media/blog/9.jpg",
      name: "William Brown",
      message: "The beauty of nature has inspired art",
      timestamp: "22, Mar 2024 - 16:50"
    }
  ];
  users = [
    {
      avatar: "./assets/images/media/blog/11.jpg",
      name: "Jack Diamond",
      description: "To generate Lorem Ipsum"
    },
    {
      avatar: "./assets/images/media/blog/12.jpg",
      name: "Dhruva Gen",
      description: "Generators on the Internet"
    },
    {
      avatar: "./assets/images/media/blog/10.jpg",
      name: "Henry Milo",
      description: "Always free from repetition"
    },
    {
      avatar: "./assets/images/media/blog/13.jpg",
      name: "Peter Paul",
      description: "Lorem Ipsum is not simply text"
    },
    {
      avatar: "./assets/images/media/blog/12.jpg",
      name: "Fahad Rafi",
      description: "Electronic typesetting, remaining"
    },
    {
      avatar: "./assets/images/media/blog/5.jpg",
      name: "Khanu Milo",
      description: "Trending habits"
    }
  ];
}
