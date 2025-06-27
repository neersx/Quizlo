import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-jobs-dashboard',
  imports: [CommonModule],
  templateUrl: './spk-jobs-dashboard.component.html',
  styleUrl: './spk-jobs-dashboard.component.scss'
})
export class SpkJobsDashboardComponent {
  @Input() title: string = '';
  @Input() count: string | number = '';
  @Input() timeFrame: string = '';
  @Input() avatarBgClass: string = '';
  @Input() iconClass: string = '';
  @Input() badgeClass: string = '';
  @Input() percentage: number = 0;
  @Input() overflowHidden: boolean = false;
}
