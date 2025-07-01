import { Component, DOCUMENT, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/sharedmodule';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/identity/auth.service';
import { CommonModule } from '@angular/common';
import { RegisterDto } from '../models/register.model';

@Component({
  selector: 'app-register',
  imports: [RouterModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule],
  providers: [
    { provide: ToastrService, useClass: ToastrService },
    AuthService
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  showPassword = false;
  submitted = false;
  disabled = true;
  showPassword1 = false;
  toggleClass = "off-line";
  toggleClass1 = "off-line";

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

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-white');
  }

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
        console.log('Login successful, currentUser:', this.authService.currentUser);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/test'; // or any default
        this.router.navigateByUrl(returnUrl);
      },
      error: err => {
        const msg = err.error?.message || 'Login failed. Please try again.';
        this.toastr.error(msg, 'Login Error');
      }
    });
  }

}
