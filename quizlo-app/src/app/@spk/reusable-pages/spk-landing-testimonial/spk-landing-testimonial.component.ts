import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'spk-landing-testimonial',
  imports: [NgbTooltipModule],
  templateUrl: './spk-landing-testimonial.component.html',
  styleUrl: './spk-landing-testimonial.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class SpkLandingTestimonialComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() avatar: string = '';
  @Input() review: string = '';
  @Input() rating: number = 0;
  @Input() daysAgo: string = '';
}
