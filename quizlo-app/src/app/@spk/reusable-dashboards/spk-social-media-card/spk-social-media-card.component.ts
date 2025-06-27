import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'spk-social-media-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-social-media-card.component.html',
  styleUrl: './spk-social-media-card.component.scss'
})
export class SpkSocialMediaCardComponent {
  @Input() platform: string = '';          // Platform name (e.g., Instagram, LinkedIn)
  @Input() followers: string = '';         // Followers count (e.g., 457K)
  @Input() percentageChange: string = '';  // Percentage change (e.g., 1.5%)
  @Input() icon: string = '';              // Platform icon class (e.g., ri-instagram-line)
  @Input() bgClass: string = '';           // Background class (e.g., bg-primary)
  @Input() trendClass: string = '';        // Trend class for the percentage (e.g., text-success)
  @Input() trendIcon: string = '';         // Icon for the trend (e.g., bi-arrow-up-right)
  @Input() trendColor: string = '';       // Color for the trend percentage (e.g., text-success)
  @Input() timePeriod: string = '';    
}
