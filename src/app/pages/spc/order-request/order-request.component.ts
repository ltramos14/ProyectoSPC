import { Component, OnInit } from '@angular/core';

import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { OrderService } from 'src/app/service/users/order.service';

@Component({
  selector: 'spc-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class OrderRequestComponent implements OnInit {

  icDoneAll = icDoneAll;

  orderRequest: Order[] = [];

  total: number = 0;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    const { uid } = await this.authService.getCurrentUser();
    this.getPreOrders(uid);
  }
  
  getPreOrders (id: string) {
    this.orderService.getOrderProducts(id).subscribe((data) => {
      this.orderRequest = data;
      this.getTotalValue();
    });
  }

  getTotalValue() {
    let total = 0;

    if (this.orderRequest.length > 0) {
      this.orderRequest.forEach((element) => {
        element.products.forEach(product => {
          total = total + product.subtotal;
          this.total = total;
        })
      });
    } else {
      this.total = 0;
    }
  }

}
