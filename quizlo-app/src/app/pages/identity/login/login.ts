import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/identity/auth.service';
import { SharedModule } from '../../../shared/sharedmodule';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService },
    AuthService
  ],
    templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  public showPassword: boolean = false;

  toggleClass = 'off-line';
  active = 'Angular';
  firestoreModule: any;
  databaseModule: any;
  authModule: any;
  public togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === 'line') {
      this.toggleClass = 'off-line';
    } else {
      this.toggleClass = 'line';
    }
  }
  disabled = '';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    public authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {
    // AngularFireModule.initializeApp(environment.firebase);
    document.body.classList.add('authentication-background');
    const bodyElement = this.renderer.selectRootElement('body', true);
    this.renderer.setAttribute(bodyElement, 'class', 'cover1 justify-center');
  }


  ngOnDestroy(): void {
    document.body.classList.remove('authentication-background');
   
  }
  ngOnInit(): void {
    if( this.authservice.currentUser !== null) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  // firebase

  phoneNumber = '';
  password = '';
  errorMessage = ''; // validation _error handle
  _error: { name: string; message: string } = { name: '', message: '' }; // for firbase _error handle

  clearErrorMessage() {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }

  login() {
    // this.disabled = "btn-loading"
    this.clearErrorMessage();
    if (
      this.validateForm(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
    ) {
      this.authservice.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            console.log(res);
            this.router.navigate(['/test']);
            this.toastr.success('login successful', 'Royal रसोई', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          }
          console.clear();
        },
        error: (_error: any) => {
          this._error = _error;
          this.router.navigate(['/']);
        },
      });
    } else {
      this.toastr.error('Invalid details', 'zeno', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  validateForm(phoneNumber: string, password: string) {
    if (phoneNumber.length === 0) {
      this.errorMessage = 'please enter phoneNumber id';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  //angular
  public loginForm!: FormGroup;
  public error: any = '';

  get form() {
    return this.loginForm.controls;
  }

  Submit() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.toastr.error('Invalid details', 'zeno', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }
}
