import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-timeline03',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-timeline03.component.html',
  styleUrl: './spk-timeline03.component.scss'
})
export class SpkTimeline03Component {
  @Input() steps:any

}
