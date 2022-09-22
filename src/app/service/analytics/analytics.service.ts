import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl + '/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private http: HttpClient
  ) { }

  getAdminNews(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/admin-news`);
  }

  getRecentProducts(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/recent-products`)
  }

  getUsersByType(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/users-by-type`);
  }

  getUsersQuatity(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/users`);
  }

  getProductsQuatity(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/products`);
  }

  getProductByType(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/products-by-type`);
  }

}
