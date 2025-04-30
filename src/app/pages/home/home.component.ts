import { AuthService } from '../../core/services/auth/auth.service';
import { PrescriptionService } from '../../core/services/prescription/prescription.service';
import { Component, inject } from '@angular/core';
import { ImagesService } from '../../core/services/images/images.service';
import { IPrescription } from '../../shared/interfaces/Iprescription';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  private readonly imagesService = inject(ImagesService);
  private readonly prescriptionService = inject(PrescriptionService);
  private readonly toastr = inject(ToastrService);
  images: IPrescription[] = [] as IPrescription[];
  show: boolean = false;
  user: any;
  isMobile: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.isMobile = this.detectMobileDevice();
  }

  detectMobileDevice(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android|iphone|ipad|ipod|windows phone/i.test(userAgent);
  }

  getPrescriptionsData(): void {
    this.imagesService.getAllPriscriptions().subscribe({
      next: (res) => {
        this.images = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.prescriptionService.uploadPrescription(file).subscribe({
        next: () => {
          this.toastr.success('Prescription uploaded successfully');
          this.show = true;
          this.router.navigate(['/uploads']);
        },
        error: (err) => {
          this.toastr.error(err.message || 'Upload failed');
        }
      });
    }
  }

  hide() {
    this.show = false;
  }
}
