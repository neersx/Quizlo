import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spk-stock-card1',
  imports: [CommonModule],
  templateUrl: './spk-stock-card1.component.html',
  styleUrl: './spk-stock-card1.component.scss'
})
export class SpkStockCard1Component  implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() value: string = '';
  @Input() changePercentage: string = '';
  @Input() changeValue: string = '';
  @Input() textColor: string = '';
  @Input() bgColor: string = '';
  
  parsedChangePercentage: number = 0;
  parsedChangeValue: number = 0;

  ngOnInit(): void {
    // Parse the changePercentage and changeValue from string to number (removing '%' sign if exists)
    this.parsedChangePercentage = parseFloat(this.changePercentage.replace('%', ''));
    this.parsedChangeValue = parseFloat(this.changeValue.replace('$', '').replace(',', ''));
  }
}
