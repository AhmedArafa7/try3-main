import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/)
      ]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    const credentials = this.loginForm.value;
  
    this.authService.sendLoginForm(credentials).subscribe({
      next: (response) => {
        this.authService.setToken(response.token); 
        this.toastr.success('Login successful');
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Login failed';
        this.toastr.error(errorMessage);
      }
    });
  }
}
