import { Component, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { OrderService } from 'src/app/service/users/order.service';

@Component({
  selector: 'vex-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  producerOrders: Order[]

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    const { uid } = await this.authService.getCurrentUser();
    this.getOrders(uid);
  }

  getOrders(uid: string) {
    this.orderService.getOrdersByUser(uid, 'idProducer')
      .subscribe(data => {
        console.log(data);
        this.producerOrders = data
      });
  }

}
