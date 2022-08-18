import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'spc-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input('order') order: any;

  @Input('user') user: string;

  producer: User;

  carrier: User;

  constructor(
    private userService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.getProducerInfo(this.order.idProducer);
    this.getCarrierInfo(this.order.idCarrier);
  }

  getProducerInfo(id: string) {
    this.userService.getUserInfo(id).subscribe(data => {
      this.producer = data
    })
  }

  getCarrierInfo(id: string) {
    this.userService.getUserInfo(id).subscribe(data => {
      this.carrier = data
    })
  }

  setOrderStatusStyle() {
    if (this.order.status === 'Pendiente de pago')
      return '.pending'
    if (this.order.status === 'Pagado')
      return '.paid'
    if (this.order.status === 'Cancelado')
      return '.cancelled'
    if (this.order.status === 'En camino')
      return '.preparing'
    if (this.order.status === 'Entregado')
      return '.delivered'
  }

}
