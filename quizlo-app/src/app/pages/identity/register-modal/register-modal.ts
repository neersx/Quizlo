import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../shared/sharedmodule';
import { AuthService } from '../../../services/identity/auth.service';
import { RegisterDto } from '../models/register.model';
import { FormSubmitLoader } from '../../../shared/common/loaders/form-submit-loader/form-submit-loader';
import { LoginModal } from '../login-modal/login-modal';

@Component({
  selector: 'app-register-modal',
  imports: [RouterModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormSubmitLoader,
    LoginModal,
    HttpClientModule],
  providers: [
    { provide: ToastrService, useClass: ToastrService },
    AuthService
  ],
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterModal implements OnInit, OnDestroy {
  displayLogin = false;
  registerForm!: FormGroup;
  showPassword = false;
  submitted = false;
  disabled = true;
  showPassword1 = false;

  toggleClass: string | undefined;

  showSubmissionLoader = false;
  submissionMessage = 'Submitting form...';
  submissionSubmessage = 'Please wait while we process your request';
  submissionSpinnerType: 'default' | 'dots' | 'pulse' = 'default';
  submissionShowProgress = false;
  submissionProgress: number | null = null;
  submissionSteps: string[] = [];
  submissionCurrentStep = 0;

  constructor(
    public readonly authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  createpassword() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === "off-line") {
      this.toggleClass = "line";
    } else {
      this.toggleClass = "off-line";
    }
  }

  login() {
    this.displayLogin = true;
    this.cdr.detectChanges();
  }

  register() {
    this.displayLogin = false;
    this.cdr.detectChanges();
  }

  onLoginSuccess(value: any) {
    this.displayLogin = false;
    this.activeModal.close({ isSuccess: true, data: value});
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.toastr.error('Please enter valid email and password', 'Login Error');
      return;
    }

    const dto: RegisterDto = {
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phoneNumber: '' // You can add a phoneNumber field to the form as needed
    };

    this.authService.register(dto).subscribe({
      next: (res: any) => {
      
        console.log('Register successful, currentUser:', res);
        this.loginUser();
      },
      error: err => {
        this.submitted = false;
        const msg = err.error?.message || 'Login failed. Please try again.';
        this.activeModal.close({ isSuccess: false, data: {message: msg} });
        this.cdr.detectChanges();
      }
    });
  }

  loginUser() {
    const loginForm = {email: this.registerForm.value.email, password: this.registerForm.value.password};
    this.authService.login(loginForm).subscribe({
      next: (res: any) => {
        console.log('Login successful, currentUser:', this.authService.currentUser);
        this.submitted = false;
        this.activeModal.close({ isSuccess: true, data: res });
        this.cdr.detectChanges();
      },
      error: err => {
        this.submitted = false;
        const msg = err.error?.message || 'Login failed. Please try again.';
        this.activeModal.close({ isSuccess: false, data: {message: msg} });
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-white');
    this.cdr.detach();
  }

}
