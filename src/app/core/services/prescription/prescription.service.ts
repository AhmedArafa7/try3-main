import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPrescription } from '../../../shared/interfaces/Iprescription';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = `${environment.baseUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  uploadPrescription(file: File): Observable<{ Message: string; PrescriptionId: number }> {
    const formData = new FormData();
    formData.append('Image', file); 

    const headers = this.getAuthHeaders();
    return this.http.post<{ Message: string; PrescriptionId: number }>(`${this.apiUrl}/upload`, formData, { headers })
      .pipe(
        catchError((err) => {
          let errorMessage = 'Failed to upload prescription';
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  getPrescriptions(): Observable<IPrescription[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<IPrescription[]>(this.apiUrl, { headers });
  }

  deletePrescription(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
