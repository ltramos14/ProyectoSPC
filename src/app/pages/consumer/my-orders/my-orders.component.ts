import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/users/order.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

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

  consumerOrders: Order[] = [];

  columnsToDisplay = ['orderDate', 'idProducer','products', 'chosenPayment', 'status', 'total'];
 /*  columnsToDisplay = ['orderDate', 'idProducer','Productos', 'Datos de pago', 'Datos de envío', 'Estado', 'Total']; */

  expandedOrder: Order | null;

  constructor(
    private activedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(({ id }) => {
      this.getConsumerOrders(id);
    });
  }

  getConsumerOrders(id: string): void {
    this.orderService.getOrdersByUser(id, 'idConsumer').subscribe(data => {
      this.consumerOrders = data;
      console.log(data);
      
    });
  }

}
