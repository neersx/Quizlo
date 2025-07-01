import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

Swiper.use([Autoplay, Navigation, Pagination]);
register();

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
})
export class SwiperComponent implements AfterViewInit {

  @Input() imageData: any[] = [];
  @Input() swiperClass: string = '';
  @Input() effect: string = '';
  @Input() spaceBetween: number = 10;
  @Input() slidesPerView!: number;
  @Input() direction: string = '';
  @Input() autoplayDelay: number = 2000;
  @Input() navigation?: any ;
  @Input() pagination?: any ;
  @Input() autoplayDisableOnInteraction: boolean = false;
  @Input() breakpoints: any = {};
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  ngOnInit(): void {
    if (this.swiperContainer?.nativeElement) {
      this.swiperContainer.nativeElement.swiper.destroy();
      this.swiperContainer.nativeElement.initialized = false;
      this.swiperContainer.nativeElement.initialize();
    }
  }
  
  ngAfterViewInit() {
    if (this.swiperContainer?.nativeElement) {
      const swiperEl = this.swiperContainer.nativeElement;
  
      // Convert string input values for navigation and pagination
      // const isnavigation = this.navigation !== false;
      // const isPaginationEnabled = this.pagination == false;
  
      Object.assign(swiperEl, {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        direction: this.direction,
        pagination: this.pagination ? { clickable: true } : false,
        navigation: this.navigation,
        autoplay: {
          delay: this.autoplayDelay,
          disableOnInteraction: this.autoplayDisableOnInteraction,
        },
        effect: this.effect || '',
        breakpoints: this.breakpoints,
     
      });
      // swiperEl.initialize();
    }
  }
  @Input() dynamicAttributes: { [key: string]: any } = {};
  
}

