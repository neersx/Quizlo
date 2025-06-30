import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/sharedmodule';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../services/test-service';
import { TestDetailsModel } from '../model/tests.model';
import { QuestionModel } from '../model/questions.model';

@Component({
  selector: 'app-live-test',
  imports: [SharedModule,NgbTooltipModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './live-test.html',
  styleUrl: './live-test.scss'
})
export class LiveTest {
  thumbsSwiper: any;
  testDetails: TestDetailsModel | null = null;
  questions: QuestionModel[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const examId   = Number(params['examId']);
      const language = params['language'];
      const code = params['code'];
      const examName = params['examName'];
      const subject  = params['subject'];
      const difficulty = params['difficulty'];

      if (!examId || !language) {
        this.error = 'Missing examId or language';
        return;
      }
      this.createAndNavigateToTest(examId, language, code, examName, subject, difficulty);
    });
  }

  private createAndNavigateToTest(examId: number, language: string, examCode: string = '', examName: string = '', subject: string = 'All', difficulty: number = 3) {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-IN', { day:   '2-digit', month: '2-digit', year:  'numeric'
    });
    // e.g. "28/06/2025"
    const title = `${examCode}-${formatted.replace(/\//g, '-')} Mock Test`;

    const payload: any = {
      examId,     // adjust as needed
      subject,       // or your dynamic subject
      language,
      examCode,
      examName,
      difficulty: +difficulty,              // use your enum: 0 = Easy, 1 = Medium, 2 = Hard 3 = Mix  etc.
      title,      // or build from exam name
      duration: '00:00:00'        // e.g. HH:MM:SS
    };

    this.startTest(payload);
  }

  startTest(payload: any) {
    this.testService.createTest(payload).subscribe({
      next: (resp: any) => {
        if (resp.isSuccess && resp.data) {
          this.testDetails = resp.data as TestDetailsModel;
          // Optional: Parse Options from optionsJson for each question
          this.questions = (this.testDetails?.questions || []).map((q: any) => ({
            ...q,
            options: q.options
          }));
          console.log('Test Details:', this.testDetails);
          console.log('Questions:', this.questions);
        } else {
          this.error = resp.message ?? 'Could not start test';
        }
      },
      error: err => {
        this.error = err.message || 'Server error';
      }
    });
  }

  // Helper to parse options from JSON string
parseOptions(optionsJson: string): string[] {
  try {
    return JSON.parse(optionsJson);
  } catch {
    return [];
  }
}

  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }


  ngAfterViewInit(): void {
		const swiperEl = this.swiperContainer.nativeElement;
	
		Object.assign(swiperEl, {
      slidesPerView: 2,
      spaceBetween: 5,
      mousewheel: true,
      loop: true,
      direction: "vertical",
      autoplay: {
          delay: 2500,
          disableOnInteraction: false
      },
      breakpoints: {
          350: {
              slidesPerView: 3,
              spaceBetween: 8,
          },
      },
	  });
  }
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
      
  jobs = [
    {
      title: 'Frontend Developer',
      company: 'InnovateZ Solutions',
      location: 'San Francisco, CA',
      experience: '2+ Yrs Exp.',
      experienceClass:" bg-info-transparent",
      salaryRange: '$50k - $80k',
      imageUrl: './assets/images/media/jobs/2.png',
      locationClass:'bg-info-transparent',
    },
    {
      title: 'Backend Developer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      experience: '3+ Yrs Exp.',
      salaryRange: '$60k - $90k',
      experienceClass:" bg-info-transparent",
      locationClass:'bg-info-transparent',
      icon:true,
      iconbg:"danger"

    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Designs Co.',
      location: 'Seattle, WA',
      experience: '3+ Yrs Exp.',
      salaryRange: '$70k - $100k',
      experienceClass:" bg-info-transparent",
      locationClass:'bg-info-transparent',
      icon:true,
      iconbg:"warning"
    },
    {
      title: 'Full Stack Developer',
      company: 'TechGurus Ltd.',
      location: 'Los Angeles, CA',
      experience: '5+ Yrs Exp.',
      salaryRange: '$80k - $120k',
      experienceClass:" bg-info-transparent",
      locationClass:'bg-info-transparent',
      icon:true,
      iconbg:"info"

    }
  ];
  // jobs=[
  //   {
  //     src:"./assets/images/media/jobs/2.png",
  //     role:"Frontend Developer",
  //     company:" InnovateZ Solutions",
  //     location:"San Francisco, CA",
  //     exp:"2",
  //     salary:"$50k - $80k"
  //   },
  //   {
  //     src:"./assets/images/media/jobs/2.png",
  //     role:"Backend Developer",
  //     company:"Tech Solutions Inc.",
  //     location:"New York, NY",
  //     exp:"3",
  //     salary:"$60k - $90k"
  //   },
  //   {
  //     src:"./assets/images/media/jobs/2.png",
  //     role:"Backend Developer",
  //     company:"Tech Solutions Inc.",
  //     location:"New York, NY",
  //     exp:"3",
  //     salary:"$60k - $90k"
  //   },
  // ]
}

