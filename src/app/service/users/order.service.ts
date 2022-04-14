import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';


const baseUrl = environment.apiUrl + '/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }


  getOrderProducts(uid: string) {
    return this.http.get<Order[]>(`${ baseUrl }/order-products/${ uid }`);
  }

}
