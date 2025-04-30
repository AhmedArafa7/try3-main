import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], 
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const { FullName, Email, Password, ConfirmPassword } = this.signupForm.value;

    if (Password !== ConfirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    const user = { FullName, Email, Password, ConfirmPassword };

    this.authService.sendRegisterForm(user).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.toastr.success('Registration successful');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Registration failed');
      }
    });
  }
}
