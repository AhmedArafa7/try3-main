import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private myToken: any;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.myToken = localStorage.getItem('token');
    }
  }

  uploadImage(image: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/images`,
      {
        imageSrc: image
      },
      {
        headers: {
          token: this.myToken
        }
      });
  }

  getImage(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/notauth/images/${id}`, { responseType: 'blob' });
  }

  getAllPriscriptions(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/images');
  }

  getSpecificPriscriptionData(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/images/${id}`);
  }
}
