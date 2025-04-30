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
    let headers = new HttpHeaders();
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  uploadPrescription(file: File): Observable<{ Message: string; PrescriptionId: number }> {
    if (!file || file.size === 0) {
      return throwError(() => new Error('No valid file selected'));
    }
  
    const formData = new FormData();
    formData.append('Image', file);
  
    const headers = this.getAuthHeaders();
    return this.http.post<{ Message: string; PrescriptionId: number }>(`${this.apiUrl}/upload`, formData, { headers })
      .pipe(
        catchError((err) => {
          let errorMessage = 'Failed to upload prescription';
      
          if (err.error) {
            if (typeof err.error === 'string') {
              try {
                const parsed = JSON.parse(err.error);
                if (parsed.message) {
                  errorMessage = parsed.message;
                }
              } catch {
                errorMessage = err.error;
              }
            } else if (err.error.message) {
              errorMessage = err.error.message;
            }
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
