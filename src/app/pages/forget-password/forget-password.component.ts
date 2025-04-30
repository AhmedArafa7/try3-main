import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-Password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-Password.component.html',
  styleUrl: './forget-Password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  step:number = 1;

  verifayEmail:FormGroup = new FormGroup( {
    Email : new FormControl(null, [Validators.required, Validators.email])
  })

  verifayCode:FormGroup = new FormGroup( {
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword:FormGroup = new FormGroup( {
    Email : new FormControl(null, [Validators.required, Validators.email]),
    newPassword : new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  verifayEmailSubmit():void {
    this.authService.setEmailVerifay( this.verifayEmail.value).subscribe({
      next: (res) => {
        if(res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  verifayCodeSubmit():void {
    this.authService.setCodeVerifay( this.verifayCode.value).subscribe({
      next: (res) => {
        if(res.status === 'Success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  restPasswordSubmit():void {
    this.authService.setResetPass( this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        this.authService.getUserData();
        this.router.navigate(['/home']);
        if(res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
