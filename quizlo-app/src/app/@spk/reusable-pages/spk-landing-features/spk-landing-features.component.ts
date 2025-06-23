import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-landing-features',
  imports: [CommonModule],
  templateUrl: './spk-landing-features.component.html',
  styleUrl: './spk-landing-features.component.scss'
})
export class SpkLandingFeaturesComponent {
  @Input() iconClass: string = ''; // Icon class
  @Input() title: string = ''; // Card title
  @Input() description: string = ''; // Description
  @Input() textColorClass: string = ''; // Text color class (e.g. text-primary)
  @Input() cardClass: string = '';
}
