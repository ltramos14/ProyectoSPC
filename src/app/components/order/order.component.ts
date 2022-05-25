import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/interfaces/user.interface';
import { Address } from 'src/app/models/address.model';
import { UsersService } from 'src/app/service/users/users.service';
import { ViewDetailDialogComponent } from '../view-detail-dialog/view-detail-dialog.component';

@Component({
  selector: 'spc-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input('order') order: any;

  @Input('user') user: string; 

  producer: User;
  
  consumer: User;
  
  carrier: User;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    if (this.user === 'consumidor') {
      this.getProducerInfo(this.order.idProducer); 
      this.getCarrierInfo(this.order.idCarrier); 
    } else if (this.user === 'productor') {
      this.getConsumerInfo(this.order.idConsumer); 
      this.getCarrierInfo(this.order.idCarrier); 
    } else {
      this.getConsumerInfo(this.order.idConsumer); 
      this.getProducerInfo(this.order.idProducer); 
    }

  }

  getConsumerInfo(id: string) {
    this.userService.getUserInfo(id).subscribe(data => {
      this.consumer = data
    })
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

  openDetailDialog(title: string, address: Address) {
    this.dialog.open(ViewDetailDialogComponent, {
      data: {
        title,
        address
      }
    });
  }

  setOrderStatusStyle() {
    if (this.order.status === 'Pendiente de pago')
      return '.pending'
    if (this.order.status === 'Entregado')
      return '.delivered'
    if (this.order.status === 'Pagado')
      return '.paid'
  }

}
