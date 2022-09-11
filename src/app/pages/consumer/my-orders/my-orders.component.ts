import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import icDown from '@iconify/icons-ic/twotone-keyboard-arrow-down';

import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/users/order.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { UsersService } from 'src/app/service/users/users.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyOrdersComponent implements OnInit {

  consumerOrders: Order[];

  columnsToDisplay = ['orderDate', 'idProducer', 'idCarrier', 'products', 'chosenPayment', 'status', 'total'];
  
  expandedOrder: Order | null;

  icDown = icDown;

  loading: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private orderService: OrderService  ) { }

  ngOnInit(): void {
    this.loading = true;
    const { id } = this.activedRoute.snapshot.params;
    this.getConsumerOrders(id);
  }

  getConsumerOrders(id: string): void {
    this.orderService.getOrdersByUser(id, 'idConsumer').subscribe(data => {
      this.consumerOrders = data;
      this.loading = false;
    });
  }

}
