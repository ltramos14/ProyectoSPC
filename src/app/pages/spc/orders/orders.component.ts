import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { OrderService } from 'src/app/service/users/order.service';

@Component({
  selector: 'vex-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  producerOrders: Order[];

  loading: boolean = false;

  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    this.loading = true;
    const { uid } = await this.authService.getCurrentUser();
    this.getOrders(uid);
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe();
  }

  getOrders(uid: string) {
    this.subscription = this.orderService.getOrdersByUser(uid, 'idProducer')
      .subscribe(data => {
        this.producerOrders = data;
        this.loading = false;
      });
  }

}
