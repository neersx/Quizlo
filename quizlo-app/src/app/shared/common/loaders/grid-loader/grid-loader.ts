import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-grid-loader',
  imports: [CommonModule],
  templateUrl: './grid-loader.html',
  styleUrl: './grid-loader.scss'
})
export class GridLoader {
  @Input() theme: 'light' | 'dark' | 'auto' = 'light';
  @Input() columns: Array<{
    type: 'text' | 'number' | 'date' | 'status' | 'action' | 'avatar';
    width: number;
  }> = [
    { type: 'avatar', width: 10 },
    { type: 'text', width: 30 },
    { type: 'text', width: 25 },
    { type: 'date', width: 20 },
    { type: 'status', width: 10 },
    { type: 'action', width: 5 }
  ];

  @Input() rowCount: number = 5;
  @Input() showPagination: boolean = true;

  get rows(): number[] {
    return Array.from({ length: this.rowCount }, (_, i) => i);
  }

  getCellClass(type: string): string {
    return type;
  }
}
