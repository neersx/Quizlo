import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-landing-services-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-landing-services-card.component.html',
  styleUrl: './spk-landing-services-card.component.scss'
})
export class SpkLandingServicesCardComponent {
  @Input() image: string = ''; // Image URL
  @Input() title: string = ''; // Service title
  @Input() description: string = ''; // Service description
  @Input() link: string = '';
   @Input() height: string = '300px'; // Default height for the card
   @Input() width: string = '300px';
}
