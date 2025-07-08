import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-loader',
  imports: [CommonModule],
  templateUrl: './form-loader.html',
  styleUrl: './form-loader.scss'
})
export class FormLoader {
  
  @Input() fields: Array<{ type: 'input' | 'textarea' | 'select'; showError?: boolean; }> = 
  [
    { type: 'input' },
    { type: 'input' },
    { type: 'select' },
    { type: 'textarea' }
  ];

  @Input() showButtons: boolean = true;
  @Input() theme: 'light' | 'dark' | 'auto' = 'light';

  getInputClass(type: string): string {
    return type === 'textarea' ? 'textarea' : 
           type === 'select' ? 'select' : '';
  }
}
