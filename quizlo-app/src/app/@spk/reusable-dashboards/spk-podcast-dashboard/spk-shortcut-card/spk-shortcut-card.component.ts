import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-shortcut-card',
  imports: [],
  templateUrl: './spk-shortcut-card.component.html',
  styleUrl: './spk-shortcut-card.component.scss'
})
export class SpkShortcutCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() itemCount: number = 0;
  @Input() bgColor: string = '';
}
