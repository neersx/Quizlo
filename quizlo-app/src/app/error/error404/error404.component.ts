import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/sharedmodule';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterModule,SharedModule],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})
export class Error404Component {

}
