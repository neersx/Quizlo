import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-timeline01',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-timeline01.component.html',
  styleUrl: './spk-timeline01.component.scss'
})
export class SpkTimeline01Component {
@Input() timelineData:any
}
