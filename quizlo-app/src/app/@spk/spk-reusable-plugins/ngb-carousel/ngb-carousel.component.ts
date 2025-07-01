import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-carousel',
  standalone: true,
  imports: [NgbModule,CommonModule],
  templateUrl: './ngb-carousel.component.html',
  styleUrl: './ngb-carousel.component.scss'
})
export class NgbCarouselComponent {
  @Input() images: any[] = []; // Array of image URLs
  @Input() interval: number = 3000; // Duration between slides
  @Input() showNavigationArrows: boolean = false; // Controls visibility of navigation arrows
  @Input() showNavigationIndicators: boolean = false; // Controls visibility of navigation indicators
  @Input() carouselId: string = 'carouselExample'; // Unique ID for the carousel
  @Input() carouselClass: string = 'carouselExample'; // Unique ID for the carousel
  @Input() title: string = ''; // Unique ID for the carousel


}
