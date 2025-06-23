import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
@Component({
  selector: 'app-spk-flatpickr',
  standalone: true,
  imports: [FlatpickrModule,CommonModule,FormsModule,ReactiveFormsModule],
  providers: [
    FlatpickrDefaults,
  ],
  templateUrl: './spk-flatpickr.component.html',
  styleUrl: './spk-flatpickr.component.scss'
})
export class SpkFlatpickrComponent {
  @Input() altInput: boolean = false; 
  @Input() convertModelValue: boolean = true;
  @Input() enableTime: boolean = true; 
  @Input() noCalendar: boolean = false; 
  @Input() inline: boolean = false; 
  @Input() class: string = ''; 
  @Input() dateFormat: string = ''; 
  @Input() placeholder: string = 'Choose date'; 
  @Input() mode: any = ''; 

  inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
  disableMobile: true
  };
  rangeValue: any = new Date(); // Default to a single date value


  // flatpickrOptions: FlatpickrOptions;
  // rangeValue: { from: Date; to: Date } = {
  //   from: new Date(),
  //   to: (new Date() as any)['fp_incr'](10)
  // };
  constructor() {}

  ngOnInit() {
    this.flatpickrOptions = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      disableMobile: true
    }
   
    flatpickr('#inlinetime', this.flatpickrOptions);

      this.flatpickrOptions = {
        enableTime: true,
        dateFormat: 'Y-m-d H:i', // Specify the format you want
        defaultDate: '2023-11-07 14:30', // Set the default/preloaded time (adjust this to your desired time)
        disableMobile: true
      };

      flatpickr('#pretime', this.flatpickrOptions);
  }
}
