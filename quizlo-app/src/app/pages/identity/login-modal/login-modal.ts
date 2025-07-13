
// src/app/auth/login.component.ts
import { Component, OnInit, OnDestroy, Inject, Renderer2, PLATFORM_ID, EventEmitter, Output } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/identity/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/sharedmodule';
import { FormSubmitLoader } from '../../../shared/common/loaders/form-submit-loader/form-submit-loader';

@Component({
  selector: 'app-login-modal',
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormSubmitLoader,
    HttpClientModule,
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService },
    AuthService
  ],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss'
})
export class LoginModal implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  showPassword = false;
  toggleClass = 'off-line';
  active = 'Angular';
  disabled = '';
  submitted = false;
  @Output() onLoginSuccess = new EventEmitter<boolean>();
  @Output() onLoginFailed = new EventEmitter<boolean>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public readonly authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  errorMessage = ''; // validation _error handle
  _error: { name: string; message: string } = { name: '', message: '' }; // for firbase _error handle

  clearErrorMessage() {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }

  ngOnInit(): void {
    // Build the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter valid email and password', 'Login Error');
      return;
    }

    this.submitted = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.submitted = false;
        this.onLoginSuccess.emit(res);
      },
      error: err => {
        const msg = err.error?.message || 'Login failed. Please try again.';
        this.toastr.error(msg, 'Login Error');
        this._error = { name: "UnAuthorized User", message: "Incorrect email or password. Try gain!" }
        this.onLoginFailed.emit(msg);
      }
    });
  }

  register(): void {
    this.router.navigate(['/auth/register']);
  }
}
