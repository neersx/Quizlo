import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'spk-reusable-tables',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './spk-reusable-tables.component.html',
  styleUrl: './spk-reusable-tables.component.scss'
})
export class SpkReusableTablesComponent {
  @Input() columns: any[] = [];
  @Input() tableClass: string='';
  @Input() tableHead: string='';
  @Input() tableFooter: string='';
  @Input() tableBody: string='';
  @Input() checkboxClass: string='';
  @Input() tableFoot: string='';
  @Input() tableHeadColumn: string='';
  @Input() data: any[] = [];
  @Input() title: any[] = [];
  @Input() footerData: any[] = [];
  @Input() showFooter: boolean = false;
  @Input() showCheckbox :boolean=false;
  @Input() rows: { checked: boolean; [key: string]: any }[] = [];
  allTasksChecked!: boolean;
  tableData: any;  
  @Output() toggleSelectAll = new EventEmitter<boolean>();
  @Output() openDetails = new EventEmitter<any>();

  // Toggle select/deselect all checkboxes
  onToggleSelectAll(event: any) {
    this.toggleSelectAll.emit(event.target.checked);
  }
  toggleRowChecked(row: any) {
    row.checked = !row.checked;
    this.allTasksChecked = this.data.every(row => row.checked);
  }

  // Update the "Select All" checkbox based on row selections
  updateSelectAllCheckbox(): void {
    this.allTasksChecked = this.data.every(row => row.checked); // Check if all rows are selected
  }
}
