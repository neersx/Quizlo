import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-shortcut-card',
  imports: [CommonModule],
  templateUrl: './spk-shortcut-card.component.html',
  styleUrl: './spk-shortcut-card.component.scss'
})
export class SpkShortcutCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() itemCount: number = 0;
  @Input() bgColor: string = '';
  @Input() cssClass?: string = 'card-bg-warning';
}
