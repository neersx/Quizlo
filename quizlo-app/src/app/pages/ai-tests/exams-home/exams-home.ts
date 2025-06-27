import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/sharedmodule';
import { SpkNgSelectComponent } from '../../../@spk/reusable-ui-elements/spk-ng-select/spk-ng-select.component';

@Component({
  selector: 'app-exams-home',
  imports: [SharedModule,NgApexchartsModule,NgSelectModule,SpkNgSelectComponent],
  templateUrl: './exams-home.html',
  styleUrl: './exams-home.scss'
})
export class ExamsHome {


  Currency=[
    {label:'USD',value:1},
    {label:'Pound',value:2},
    {label:'Rupee',value:3},
    {label:'Euro',value:4},
    {label:'Won',value:5},  
    {label:'Dinar',value:6},
    {label:'Rial',value:7},
  ]
  SellCoins=[
    {label:'Bitcoin',value:1},
    {label:'Etherium',value:2},
    {label:'Litecoin',value:3},
    {label:'Ripple',value:4},
    {label:'Cardano',value:5},  
    {label:'Neo',value:6},
    {label:'Stellar',value:7},
    {label:'EOS',value:7},
    {label:'NEM',value:8},
  
  
  ]
  handleSelectChange(value: any | any[]) {
  }
}
