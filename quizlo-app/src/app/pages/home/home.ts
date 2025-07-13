import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  TemplateRef,
  ViewChild,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import {
  CommonModule,
  ViewportScroller,
  isPlatformBrowser,
} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxColorsModule } from 'ngx-colors';
import {
  NgbOffcanvas,
  NgbAccordionModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {
  CarouselModule,
  OwlOptions,
  SlidesOutputData,
} from 'ngx-owl-carousel-o';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SpkLandingAboutComponent } from '../../@spk/reusable-pages/spk-landing-about/spk-landing-about.component';
import { SpkLandingFeaturesComponent } from '../../@spk/reusable-pages/spk-landing-features/spk-landing-features.component';
import { SpkLandingServicesCardComponent } from '../../@spk/reusable-pages/spk-landing-services-card/spk-landing-services-card.component';
import { SpkLandingTeamCardComponent } from '../../@spk/reusable-pages/spk-landing-team-card/spk-landing-team-card.component';
import { SpkLandingTestimonialComponent } from '../../@spk/reusable-pages/spk-landing-testimonial/spk-landing-testimonial.component';
import { PlatformService } from '../../utils/platform.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    NgbModule,
    SpkLandingTestimonialComponent,
    // SpkLandingTeamCardComponent,
    SpkLandingAboutComponent,
    SpkLandingFeaturesComponent,
    NgxColorsModule,
    NgbAccordionModule,
    CarouselModule,
    SpkLandingServicesCardComponent,
  ],
  providers: [NgbOffcanvas],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  isYearly: boolean = false;
  loading: boolean = false;

  get WindowPreSize(): number[] {
    return [window.innerWidth];
  }
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  thumbsSwiper: any;
  constructor(
    public renderer: Renderer2,
    private router: Router,
    private el: ElementRef,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private viewScroller: ViewportScroller,
    private platform: PlatformService
  ) {
    const doc = this.platform.getDocument();
    if (doc) {
      console.log(doc.title);
      // Safe to use `document` here
      document.body.classList.add('landing-body');
      const htmlElement =
        this.elementRef.nativeElement.ownerDocument.documentElement;
      this.renderer.setAttribute(htmlElement, 'data-toggled', 'close');
      this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'horizontal');
      this.renderer.setAttribute(htmlElement, 'data-nav-style', 'menu-click');
      this.renderer.setAttribute(htmlElement, 'data-menu-position', 'fixed');
      this.renderer.setAttribute(htmlElement, 'data-theme-mode', 'light');
      // this.renderer.removeAttribute(htmlElement, 'data-header-styles');
      // this.renderer.removeAttribute(htmlElement, 'data-menu-styles');
      // this.renderer.removeAttribute(htmlElement, 'data-vertical-style');
      // this.renderer.removeAttribute(htmlElement, 'loader');
      // this.renderer.removeAttribute(htmlElement, 'data-width');
      // this.renderer.removeAttribute(htmlElement, 'body-bg-rgb');
      // this.renderer.removeAttribute(htmlElement, 'body-bg-rgb2');
      // this.renderer.removeAttribute(htmlElement, 'light-rgb');
    }

  }
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('swiperContainer1') swiperContainer1!: ElementRef;


  private offcanvasService = inject(NgbOffcanvas);
  openSwitcher(content: any) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  input1: string = '#00897B';
  scrolled: boolean = false;
  SwitcherService: any;

  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }
  body!: HTMLBodyElement | null;

  color1 = '#845adf';
  public dynamicLightPrimary(data: any): void {
    this.color1 = data.color;

    const dynamicPrimaryLight = document.querySelectorAll('button.pcr-button');

    this.dynamicLightPrimaryColor(dynamicPrimaryLight, this.color1);

    if (this.isBrowser) {
      localStorage.setItem(
        'zeno-primary-mode',
        this.hexToRgba(this.color1) || ''
      );
      localStorage.setItem('zenolight-mode', 'true');
      this.body?.classList.remove('transparent-mode');
    }

    // Adding
    this.body?.classList.add('light-mode');

    // Removing
    this.body?.classList.remove('dark');
    this.body?.classList.remove('bg-img1');
  }
  handleThemeUpdate(cssVars: any) {
    const root: any = document.querySelector(':root');
    const keys = Object.keys(cssVars);

    keys.forEach((key) => {
      root.style.setProperty(key, cssVars[key]);
    });
  }
  // to check the value is hexa or not
  isValidHex = (hexValue: any) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);

  getChunksFromString = (st: any, chunkSize: any) =>
    st.match(new RegExp(`.{${chunkSize}}`, 'g'));
  // convert hex value to 256
  convertHexUnitTo256 = (hexStr: any) =>
    parseInt(hexStr.repeat(2 / hexStr.length), 16);
  hexToRgba(hexValue: any) {
    if (!this.isValidHex(hexValue)) {
      return null;
    }
    const chunkSize = Math.floor((hexValue.length - 1) / 3);
    const hexArr = this.getChunksFromString(hexValue.slice(1), chunkSize);
    const [r, g, b, a] = hexArr.map(this.convertHexUnitTo256);
    return `${r}, ${g} ,${b}`;
  }
  //primary theme color
  dynamicLightPrimaryColor(primaryColor: any, color: any) {
    primaryColor.forEach((item: any) => {
      const cssPropName1 = `--primary-rgb`;

      this.handleThemeUpdate({
        [cssPropName1]: this.hexToRgba(color),
      });
    });
  }
  localStorageBackUp() {
    let html = document.querySelector('html');

    if (localStorage.getItem('dir') == 'rtl') {
      html?.setAttribute('dir', 'rtl');
    }
    if (localStorage.getItem('zenodarktheme')) {
      const type: any = localStorage.getItem('zenodarktheme');
      html?.setAttribute('data-theme-mode', type);
    }
    if (localStorage.getItem('zeno-primary-mode')) {
      const type: any = localStorage.getItem('zeno-primary-mode');
      html?.style.setProperty('--primary-rgb', type);
    }
  }
  public show: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser)
      this.scrolled = window.scrollY > 10;
    const sections = this.el.nativeElement.querySelectorAll('.side-menu__item');
    const scrollPos =
      this.isBrowser ? window.scrollY ||
        this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop ||
        document.body.scrollTop : "10";
    sections.forEach((el: any, i: string | number) => {
      const currLink = sections[i];
      const val: any = currLink.getAttribute('value');
      const refElement: any = this.el.nativeElement.querySelector('#' + val);

      if (refElement !== null) {
        const scrollTopMinus = scrollPos + 73;
        if (
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          const activeNav =
            this.el.nativeElement.querySelector('.nav-scroll.active');
          if (activeNav) {
            this.renderer.removeClass(activeNav, 'active');
          }
          this.renderer.addClass(currLink, 'active');
        } else {
          this.renderer.removeClass(currLink, 'active');
        }
      }
    });
    let number =
      this.isBrowser ? window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0 : 0;
    if (number > 100) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  isActive: boolean = false;
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    this.isActive = true;
  }
  isDataToggled = false;

  expande = false;
  expande1 = false;
  expande2 = false;

  toggleExpand(): void {
    this.expande = !this.expande;
    if (localStorage.getItem('data-menu-styles') == 'light') {
      document.querySelector('html')?.setAttribute('data-menu-styles', 'light');
    } else if (localStorage.getItem('data-menu-styles') == 'light') {
      document.querySelector('html')?.setAttribute('data-menu-styles', 'light');
    }
  }
  bodyclick() {
    this.expande1 = false;
    this.expande2 = false;
    this.expande = false;
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-toggled', 'close');
  }
  ngOnInit(): void {
    if (this.isBrowser) this.localStorageBackUp();
  }
  ngOnDestroy(): void {
    this.platform.getDocument()?.body.classList.remove('landing-body');
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'vertical');
  }
  themeChange(type: string, type1: string) {
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-header-styles', type1);
    if (this.isBrowser) {
      localStorage.setItem('zenoHeader', type1);
      this.renderer.setAttribute(htmlElement, 'data-menu-styles', type1);
      localStorage.setItem('zenoMenu', type1);
      this.renderer.setAttribute(htmlElement, 'data-theme-mode', type1);
      localStorage.setItem('zenodarktheme', type1);
    }
  }

  takeTest() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/test/select-exam']);
      this.loading = false;
    }, 1000);
  }

  //  Directions
  DirectionsChange(type: string) {
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'dir', type);
    if (this.isBrowser) localStorage.setItem('dir', type);
  }

  //Theme Primary
  primary(type: string) {
    this.elementRef.nativeElement.ownerDocument.documentElement?.style.setProperty(
      '--primary-rgb',
      type
    );
    if (this.isBrowser) {
      localStorage.setItem('zeno-primary-mode', type);
      localStorage.removeItem('zenolight-primary-color');
    }
  }

  //reset switcher

  reset() {
    localStorage.clear();
    const html: any =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    const body: any = document.querySelector('body');
    html.style = '';
    html.setAttribute('dir', 'ltr');
    html.setAttribute('data-header-styles', 'light');
    html.setAttribute('data-nav-layout', 'horizontal');
    html.setAttribute('data-menu-position', 'fixed');
    html.setAttribute('data-theme-mode', 'light');
    html.removeAttribute('data-menu-styles');

    const lightclickchecked = document.getElementById(
      'switcher-light-theme'
    ) as HTMLInputElement;
    if (lightclickchecked) {
      lightclickchecked.checked = true;
    }
    const ltrclickchecked = document.getElementById(
      'switcher-ltr'
    ) as HTMLInputElement;
    if (ltrclickchecked) {
      ltrclickchecked.checked = true;
    }
  }
  toggleSidebar() {
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    const currentToggleValue = htmlElement.getAttribute('data-toggled');

    if (currentToggleValue !== 'open') {
      this.renderer.setAttribute(htmlElement, 'data-toggled', 'open');
    } else {
      this.renderer.setAttribute(htmlElement, 'data-toggled', 'close');
    }
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    margin: 30,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1, // 1 item visible for screen width less than 400 pixels
      },
      1110: {
        items: 3, // 2 item visible for screen width 400 pixels or more
      },
      1410: {
        items: 2, // 3 items visible for screen width 740 pixels or more
      },
    },
    nav: false,
  };

  activeSlides!: SlidesOutputData;

  slidesStore: any[] = [
    {
      img: './assets/images/faces/8.jpg',
      name: 'Elsa Teresa',
      mail: 'elsateresa@gmail.com',
    },
    {
      img: './assets/images/faces/9.jpg',
      name: 'Henry Milo',
      mail: 'henrymilo@gmail.com',
    },
    {
      img: './assets/images/faces/6.jpg',
      name: 'Katherin Oslo',
      mail: 'katherinoslo212@gmail.com',
    },
    {
      img: './assets/images/faces/14.jpg',
      name: 'Jestin Calm',
      mail: 'jestincalm1999@gmail.com',
    },
    {
      img: './assets/images/faces/13.jpg',
      name: 'Harin ford',
      mail: 'harinford345@gmail.com',
    },
    {
      img: './assets/images/faces/11.jpg',
      name: 'Phillip John',
      mail: 'phillipjohn21@gmail.com',
    },
  ];

  breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1110: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1400: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  };

  taptotop() {
    let body: any = document.querySelector('body');
    body.style.scrollBehavior = 'smooth';
    this.viewScroller.scrollToPosition([0, 0]);
  }

  sanitizeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  aboutCards = [
    {
      icon: 'bx bx-brain',
      iconColor: 'bg-primary-transparent',
      title: 'AI-Driven Questions',
      content: 'Get real-time, AI-generated questions tailored to your exam needs, ensuring up-to-date preparation.'
    },
    {
      icon: 'bx bx-window-open',
      iconColor: 'bg-success-transparent',
      title: 'Easy-to-Use Exam Portal',
      content: 'Our intuitive exam interface allows seamless navigation and effortless answering, simulating real exam conditions.'
    },
    {
      icon: 'bx bx-history',
      iconColor: 'bg-info-transparent',
      title: 'Personalized Progress Tracking',
      content: 'View detailed test histories and take retests to monitor improvements and strengthen weak areas.'
    },
    {
      icon: 'bx bx-slider-alt',
      iconColor: 'bg-warning-transparent',
      title: 'Customizable Test Difficulty',
      content: 'Choose your preferred difficulty level and subjects, allowing focused, targeted exam preparation.'
    },
    {
      icon: 'bx bx-group',
      iconColor: 'bg-secondary-transparent',
      title: 'Group Challenges & Rankings',
      content: 'Invite friends, form groups, and compete to measure your performance against peers in a motivating environment.'
    },
    {
      icon: 'bx bx-calendar-check',
      iconColor: 'bg-danger-transparent',
      title: 'Test Scheduling & Reminders',
      content: 'Conveniently schedule your tests and receive timely reminders through email and WhatsApp notifications.'
    }
  ];


  servicecards = [
    {
      image: '../../assets/images/exams/neet.jpg',
      title: 'NEET UG',
      description: 'AI-generated full-length NEET mocks with real-exam timing, section-wise breakdown, and instant score reports.',
    },

    {
      image: 'https://angular.spruko.com/zeno/preview/assets/images/media/landing/services/7.png',
      title: 'SSC CGL',
      description: 'End-to-end SSC CGL mock tests, real-exam pattern support, and in-depth sectional and overall performance reports.',
    },
    {
      image: '../../assets/images/exams/ibps-po.jpg',
      title: 'IBPS PO',
      description: 'Full-length IBPS PO online mocks with live timer, adaptive difficulty and instant percentile ranking.',
    },

    {
      image: '../../assets/images/exams/upsc.jpg',
      title: 'UPSC Civil Services',
      description: 'Simulate Prelims and Mains exams with AI-driven question banks, timed sections, and answer-writing feedback.',
    },
    {
      image: 'https://angular.spruko.com/zeno/preview/assets/images/media/landing/services/6.png',
      title: 'JEE Main',
      description: 'Practice JEE Main papers under timed conditions, adaptive difficulty, and detailed performance analytics.',
    },
    {
      image: '../../assets/images/exams/ctat.jpg',
      title: 'CTAT',
      description: 'Our tests are crafted preciously for Central govt. Teacher Aptitude Test (CTAT) mock exams.',
    },
    {
      image: '../../assets/images/exams/rbi.jpg',
      title: 'RBI Grade B',
      description: 'Fully automated RBI Grade B practice tests, seamless UI, and AI-backed topic-wise analytics.',
    },
    {
      image: 'https://angular.spruko.com/zeno/preview/assets/images/media/landing/services/2.png',
      title: 'GATE',
      description: 'AI-powered GATE mock exams with strict time limits, sectional scoring and instant performance dashboards.',
    },
  ];

  featuresCard = [
    {
      iconClass: 'bi bi-brightness-alt-high',
      title: 'AI-Generated Question Bank',
      description: 'Endless, exam-accurate questions created on-the-fly by our AI engine.',
      textColorClass: 'text-primary',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-speedometer2',
      title: 'Real-Exam Interface',
      description: 'Full-screen timed tests that replicate the look & feel of the official exams.',
      textColorClass: 'text-secondary',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-bar-chart-line',
      title: 'Instant Performance Analytics',
      description: 'Detailed topic-wise reports and percentile ranking delivered immediately.',
      textColorClass: 'text-info',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-sliders',
      title: 'Adaptive Difficulty',
      description: 'Questions dynamically adjust in real-time based on your mastery level.',
      textColorClass: 'text-warning',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-clock-history',
      title: 'Custom Test Scheduling',
      description: 'Create recurring mock-test schedules with calendar reminders and streak tracking.',
      textColorClass: 'text-danger',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-book-half',
      title: 'Detailed Solutions & Explanations',
      description: 'Step-by-step answer breakdowns with references to key concepts.',
      textColorClass: 'text-success',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-phone',
      title: 'Mobile-Responsive & Offline Mode',
      description: 'Practice anytime, anywhere—offline downloads let you prep without internet.',
      textColorClass: 'text-pink',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-people',
      title: 'Peer-Comparison & Leaderboards',
      description: 'See how you stack up against fellow aspirants in real-time leaderboards.',
      textColorClass: 'text-purple',
      cardClass: 'bg-image add-class',
    },
  ];

  reviews = [
    {
      name: 'Priya Sharma',
      email: 'priyasharma123@gmail.com',
      avatar: './assets/images/faces/1.jpg',
      review: 'I just finished my NEET mock test on Quizlo Ai and it was super smooth! The questions felt real and the timer feature gave exam-like pressure. Loved it!',
      rating: 5,
      daysAgo: '3 days ago',
    },
    {
      name: 'Rahul Verma',
      email: 'rahulvme95@gmail.com',
      avatar: './assets/images/faces/5.jpg',
      review: 'This is the first time I actually enjoyed giving an online test. The UI is clean, and it was easy to switch between questions. Great experience!',
      rating: 5,
      daysAgo: '6 days ago',
    },
    {
      name: 'Sneha Patil',
      email: 'snehapatil87@gmail.com',
      avatar: './assets/images/faces/3.jpg',
      review: 'I liked that I could choose the difficulty and subject before starting the test. It really helped me revise in a focused way.',
      rating: 4.5,
      daysAgo: '1 week ago',
    },
    {
      name: 'Arjun Nair',
      email: 'arjun.nair21@gmail.com',
      avatar: './assets/images/faces/9.jpg',
      review: 'The questions felt like real UPSC level. Also loved the performance analysis at the end. Felt like a real exam simulation!',
      rating: 5,
      daysAgo: '2 weeks ago',
    },
    {
      name: 'Megha Rajput',
      email: 'megharajput05@gmail.com',
      avatar: './assets/images/faces/8.jpg',
      review: 'Tried Quizlo Ai for SSC prep. Amazing interface and the timer keeps you alert. Also loved the way results are shared!',
      rating: 4.5,
      daysAgo: '5 days ago',
    },
    {
      name: 'Karan Yadav',
      email: 'karan.yadav88@gmail.com',
      avatar: './assets/images/faces/10.jpg',
      review: 'After taking the mock test here, I felt more confident. The option to share test scores with friends is a cool feature!',
      rating: 5,
      daysAgo: '4 days ago',
    },
  ];


  eventTriggered: boolean = false;
  screenWidth!: number;
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.menuResizeFn();
    if (this.isBrowser)
      this.screenWidth = window.innerWidth;

    // Check if the event hasn't been triggered and the screen width is less than or equal to your breakpoint
    if (!this.eventTriggered && this.screenWidth <= 992) {
      document.documentElement?.setAttribute('data-toggled', 'close');
      // Trigger your event or perform any action here
      this.eventTriggered = true; // Set the flag to true to prevent further triggering
    } else if (this.screenWidth > 992) {
      // Reset the flag when the screen width goes beyond the breakpoint
      this.eventTriggered = false;
    }
  }


  menuResizeFn(): void {
    if (this.isBrowser) {
      this.WindowPreSize.push(window.innerWidth);
    }

    if (this.WindowPreSize.length > 2) {
      this.WindowPreSize.shift();
    }
    if (this.WindowPreSize.length > 1) {
      const html = document.documentElement;

      if (
        this.WindowPreSize[this.WindowPreSize.length - 1] < 992 &&
        this.WindowPreSize[this.WindowPreSize.length - 2] >= 992
      ) {
        // less than 992
        html.setAttribute('data-toggled', 'close');
      }

      if (
        this.WindowPreSize[this.WindowPreSize.length - 1] >= 992 &&
        this.WindowPreSize[this.WindowPreSize.length - 2] < 992
      ) {
        // greater than 992
        html.removeAttribute('data-toggled');
        document
          .querySelector('#responsive-overlay')
          ?.classList.remove('active');
      }
    }
  }
}
