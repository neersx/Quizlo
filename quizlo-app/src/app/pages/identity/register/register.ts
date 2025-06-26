import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/sharedmodule';

@Component({
  selector: 'app-register',
  imports: [RouterModule,SharedModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  constructor(){
    document.body.classList.add('bg-white');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-white');    
  }
  showPassword = false;
  showPassword1 = false;
   toggleClass = "off-line";
  toggleClass1 = "off-line";
  createpassword() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === "off-line") {
      this.toggleClass = "line";
    } else {
      this.toggleClass = "off-line";
    }
  }
  createpassword1() {
    this.showPassword1 = !this.showPassword1;
    if (this.toggleClass1 === "off-line") {
      this.toggleClass1 = "line";
    } else {
      this.toggleClass1 = "off-line";
    }
  }

}
