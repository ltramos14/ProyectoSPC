import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from 'src/app/models/order-request.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl + '/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  sendPurchaseRequest(request: OrderRequest) {
    return this.http.post(`${ baseUrl }/purchase-request`, request);
  }

}
