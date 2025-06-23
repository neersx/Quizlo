import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-timeline02',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-timeline02.component.html',
  styleUrl: './spk-timeline02.component.scss'
})
export class SpkTimeline02Component {
@Input() notifications:any
}
