import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl + '/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  sendPurchaseRequest(order: Order) {
    return this.http.post(`${ baseUrl }/purchase-request`, order);
  }

  notifyPaidOrder(order: Order) {
    return this.http.post(`${ baseUrl }/order-paid`, order);
  }
  
  notifyOrderOnTheWay(order: Order) {
    return this.http.post(`${ baseUrl }/order-on-the-way`, order);
  }
  
  notifyOrderDelivered(order: Order) {
    return this.http.post(`${ baseUrl }/order-delivered`, order);
  }

}
