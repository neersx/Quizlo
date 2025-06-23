import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    SpkLandingTeamCardComponent,
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

  onToggle() {}
  thumbsSwiper: any;
  constructor(
    public renderer: Renderer2,
    private el: ElementRef,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private viewScroller: ViewportScroller
  ) {
    document.body.classList.add('landing-body');
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-toggled', 'close');
    this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'horizontal');
    this.renderer.setAttribute(htmlElement, 'data-nav-style', 'menu-click');
    this.renderer.setAttribute(htmlElement, 'data-menu-position', 'fixed');
    this.renderer.setAttribute(htmlElement, 'data-theme-mode', 'light');
    this.renderer.removeAttribute(htmlElement, 'data-header-styles');
    this.renderer.removeAttribute(htmlElement, 'data-menu-styles');
    this.renderer.removeAttribute(htmlElement, 'data-vertical-style');
    this.renderer.removeAttribute(htmlElement, 'loader');
    this.renderer.removeAttribute(htmlElement, 'data-width');
    this.renderer.removeAttribute(htmlElement, 'body-bg-rgb');
    this.renderer.removeAttribute(htmlElement, 'body-bg-rgb2');
    this.renderer.removeAttribute(htmlElement, 'light-rgb');
  }
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('swiperContainer1') swiperContainer1!: ElementRef;

  ngAfterViewInit(): void {
    const swiperEl = this.swiperContainer.nativeElement;
    const swiperEl1 = this.swiperContainer1.nativeElement;

    Object.assign(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: false,
        clickable: false,
      },
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1112: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    Object.assign(swiperEl1, {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
      },
      autoplay: {
        enabled: true,
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        1112: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1300: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });
  }
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

    localStorage.setItem(
      'zeno-primary-mode',
      this.hexToRgba(this.color1) || ''
    );
    localStorage.setItem('zenolight-mode', 'true');
    this.body?.classList.remove('transparent-mode');

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
    this.scrolled = window.scrollY > 10;
    const sections = this.el.nativeElement.querySelectorAll('.side-menu__item');
    const scrollPos =
      window.scrollY ||
      this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop ||
      document.body.scrollTop;
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
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
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
    this.localStorageBackUp();
  }
  ngOnDestroy(): void {
    document.body.classList.remove('landing-body');
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'vertical');
  }
  themeChange(type: string, type1: string) {
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-header-styles', type1);
    localStorage.setItem('zenoHeader', type1);
    this.renderer.setAttribute(htmlElement, 'data-menu-styles', type1);
    localStorage.setItem('zenoMenu', type1);
    this.renderer.setAttribute(htmlElement, 'data-theme-mode', type1);
    localStorage.setItem('zenodarktheme', type1);
  }
  localdata: any = localStorage;
  //  Directions
  DirectionsChange(type: string) {
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'dir', type);
    localStorage.setItem('dir', type);
  }

  //Theme Primary
  primary(type: string) {
    this.elementRef.nativeElement.ownerDocument.documentElement?.style.setProperty(
      '--primary-rgb',
      type
    );
    localStorage.setItem('zeno-primary-mode', type);
    localStorage.removeItem('zenolight-primary-color');
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
      icon: 'bx bx-layer',
      iconColor: 'bg-primary-transparent',
      title: 'Easy to Customize',
      content:
        'Magna dolore elitr ut et labore stet dolor tempor at ipsum, amet quis nostrum exercitationem.',
    },
    {
      icon: 'bx bx-package',
      iconColor: 'bg-secondary-transparent text-secondary',
      title: 'Simplified Code',
      content:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui quidem rerum facilis reprehenderi.',
    },
    {
      icon: 'bx bx-analyse',
      iconColor: 'bg-info-transparent text-info',
      title: 'Multiple Demos',
      content:
        'Blanditiis praesentium voluptatum deleniti atque corrupti quos dolores rerum hic tenetur.',
    },
  ];
  basicAccordions = [
    {
      title: 'Where can I subscribe to your newsletter?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingOne',
      collapseId: 'collapseOne',
      collapsed: false,
    },
    {
      title: 'Where can in edit my address?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingTwo',
      collapseId: 'collapseTwo',
      collapsed: true,
    },
    {
      title: 'What are your opening hours?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingThree',
      collapseId: 'collapseThree',
      collapsed: true,
    },
    {
      title: 'Do I have the right to return an item?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingFour',
      collapseId: 'collapseFour',
      collapsed: true,
    },
    {
      title: 'General Terms & Conditions (GTC)',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingFive',
      collapseId: 'collapseFive',
      collapsed: true,
    },
    {
      title: 'Do I need to create an account to make an order?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingSix',
      collapseId: 'collapseSix',
      collapsed: true,
    },
  ];
  basicAccordions1 = [
    {
      title: 'General Terms & Conditions (GTC)',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingOne',
      collapseId: 'collapseOne',
      collapsed: true,
    },
    {
      title: 'Do I need to create an account to make an order?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingTwo',
      collapseId: 'collapseTwo',
      collapsed: true,
    },
    {
      title: 'Where can I subscribe to your newsletter?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingThree',
      collapseId: 'collapseThree',
      collapsed: true,
    },
    {
      title: 'Where can in edit my address?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingFour',
      collapseId: 'collapseFour',
      collapsed: true,
    },
    {
      title: 'What are your opening hours?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingFive',
      collapseId: 'collapseFive',
      collapsed: true,
    },
    {
      title: 'Do I have the right to return an item?',
      body: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
      headingId: 'headingSix',
      collapseId: 'collapseSix',
      collapsed: false,
    },
  ];
  servicecards = [
    {
      image: './assets/images/media/landing/services/1.png',
      title: 'Health Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
      image: './assets/images/media/landing/services/2.png',
      title: 'Financial Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
      image: './assets/images/media/landing/services/3.png',
      title: 'Transportation Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
      image: './assets/images/media/landing/services/4.png',
      title: 'Educational Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
      image: './assets/images/media/landing/services/5.png',
      title: 'Home Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
      image: './assets/images/media/landing/services/6.png',
      title: 'Communication Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
      image: './assets/images/media/landing/services/7.png',
      title: 'Professional Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
      image: './assets/images/media/landing/services/8.png',
      title: 'Hospitality Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
  ];
  featuresCard = [
    {
      iconClass: 'bi bi-code-square',
      title: 'Quality of Code',
      description: 'Justo aliquyam duo vero clita aliqua vero eirmod.',
      textColorClass: 'text-primary',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-bootstrap',
      title: 'Ng-Bootstrap',
      description: 'Justo aliquyam duo vero clita aliqua vero eirmod.',
      textColorClass: 'text-secondary',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-layers',
      title: '60+ component',
      description: 'Justo aliquyam duo vero clita aliqua vero eirmod.',
      textColorClass: 'text-info',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-layout-text-sidebar',
      title: 'Ready RTL',
      description: 'Easy to switch.clita aliqua vero eirmod stet.',
      textColorClass: 'text-warning',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-person-lock',
      title: 'Custom Pages',
      description: 'Justo aliquyam duo vero clita aliqua vero eirmod.',
      textColorClass: 'text-pink',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-display',
      title: 'Layout Styles',
      description: 'Justo aliquyam duo vero clita aliqua vero eirmod.',
      textColorClass: 'text-success',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-palette',
      title: 'Theme Colors',
      description: 'Theme Background and Theme primary were there.',
      textColorClass: 'text-danger',
      cardClass: 'bg-image add-class',
    },
    {
      iconClass: 'bi bi-grid-1x2',
      title: 'Widgets',
      description: 'Justo aliquyam duo vero clita aliqua vero eirmod.',
      textColorClass: 'text-purple',
      cardClass: 'bg-image add-class',
    },
  ];
  teamMembers = [
    {
      name: 'Hadley Kylin',
      role: 'Director',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: './assets/images/faces/1.jpg',
      backgroundColor: 'teal',
      badgeColor: 'primary',
      teamClass: 'mt-4',
      bodyClass: 'p-4',
      class1: 'mb-4',
    },
    {
      name: 'Owen Foster',
      role: 'Board Director',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: './assets/images/faces/8.jpg',
      backgroundColor: 'teal',
      badgeColor: 'success',
      teamClass: 'mt-4',
      bodyClass: 'p-4',
      class1: 'mb-4',
    },
    {
      name: 'Stephen Roy',
      role: 'Creative Director',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: './assets/images/faces/11.jpg',
      backgroundColor: 'success',
      badgeColor: 'info',
      teamClass: 'mt-4',
      bodyClass: 'p-4',
      class1: 'mb-4',
    },
    {
      name: 'Jasmine Della',
      role: 'Board Director',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: './assets/images/faces/4.jpg',
      backgroundColor: 'orange',
      badgeColor: 'secondary',
      teamClass: 'mt-4',
      bodyClass: 'p-4',
      class1: 'mb-4',
    },
  ];
  reviews = [
    {
      name: 'Jenny Kingston',
      email: 'jennykingston345@gmail.com',
      avatar: './assets/images/faces/1.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      rating: 5,
      daysAgo: '16 days ago',
    },
    {
      name: 'Alex Carey',
      email: 'alexcarey21@gmail.com',
      avatar: './assets/images/faces/5.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      rating: 5,
      daysAgo: '1 month ago',
    },
    {
      name: 'Brenda Hans',
      email: 'brendahans@gmail.com',
      avatar: './assets/images/faces/3.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      rating: 5,
      daysAgo: '12 days ago',
    },
    {
      name: 'Json Taylor',
      email: 'jsontaylor@gmail.com',
      avatar: './assets/images/faces/9.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      rating: 4.5,
      daysAgo: '9 days ago',
    },
    {
      name: 'Amanda Nanes',
      email: 'amandananes212@gmail.com',
      avatar: './assets/images/faces/8.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      rating: 5,
      daysAgo: '6 days ago',
    },
    {
      name: 'Lucas Tope',
      email: 'lucastope1999@gmail.com',
      avatar: './assets/images/faces/10.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      rating: 5,
      daysAgo: '10 days ago',
    },
  ];

  eventTriggered: boolean = false;
  screenWidth!: number;
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.menuResizeFn();
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

  WindowPreSize: number[] = [window.innerWidth];
  menuResizeFn(): void {
    this.WindowPreSize.push(window.innerWidth);

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
