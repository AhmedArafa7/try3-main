import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pharmacist } from '../../../shared/interfaces/Ipharmacist';

@Injectable({
  providedIn: 'root'
})
export class PharmacistService {
  private apiUrl = `${environment.baseUrl}/pharmacists`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Pharmacist> {
    return this.http.get<Pharmacist>(`${this.apiUrl}/profile`);
  }

  updateProfile(pharmacist: { FullName: string; Email: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/profile`, pharmacist);
  }
}
