import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../shared/sharedmodule';
import { AuthService } from '../../../services/identity/auth.service';
import { RegisterDto } from '../models/register.model';
import { FormSubmitLoader } from '../../../shared/common/loaders/form-submit-loader/form-submit-loader';

@Component({
  selector: 'app-register-modal',
  imports: [RouterModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormSubmitLoader,
    HttpClientModule],
  providers: [
    { provide: ToastrService, useClass: ToastrService },
    AuthService
  ],
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.scss'
})
export class RegisterModal implements OnInit, OnDestroy {
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
      next: () => {
        this.toastr.success('Login successful', 'Welcome');
        console.log('Register successful, currentUser:');

      },
      error: err => {
        const msg = err.error?.message || 'Login failed. Please try again.';
        this.toastr.error(msg, 'Login Error');
      }
    });
  }

  loginUser() {
    const loginForm = {email: this.registerForm.value.email, password: this.registerForm.value.password};
    this.authService.login(loginForm).subscribe({
      next: () => {
        this.toastr.success('Login successful', 'Welcome');
        console.log('Login successful, currentUser:', this.authService.currentUser);
      },
      error: err => {
        const msg = err.error?.message || 'Login failed. Please try again.';
        this.toastr.error(msg, 'Login Error');
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-white');
  }

}
