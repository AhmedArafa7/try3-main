import { AuthService } from './../../core/services/auth/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}



  logout(): void {
    this.authService.logout();
  }
}