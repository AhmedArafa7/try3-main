import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, inject, input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-blanklayer',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './Blanklayout.component.html',
  styleUrl: './Blanklayout.component.scss'
})
export class BlanklayoutComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  readonly authService = inject(AuthService);
  isLogin = input<boolean>(true);




ngOnInit(): void {
  this.flowbiteService.loadFlowbite(flowbite => {
    // Your custom code here
  });
}
}
