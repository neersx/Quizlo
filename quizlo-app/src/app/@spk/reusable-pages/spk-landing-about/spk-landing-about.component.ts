import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-landing-about',
  imports: [CommonModule],
  templateUrl: './spk-landing-about.component.html',
  styleUrl: './spk-landing-about.component.scss'
})
export class SpkLandingAboutComponent {
  @Input() icon: string = ''; // Icon class
  @Input() iconColor: string = ''; // Icon background color class
  @Input() title: string = ''; // Title text
  @Input() content: string = ''; // Content text
  @Input() textColor: string = '';
}
