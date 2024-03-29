import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Address } from 'src/app/models/address.model';
import { AddressesService } from 'src/app/service/consumer/addresses.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/consumer/cart.service';
import { NotificationsService } from 'src/app/service/messaging/notifications.service';
import { OrderRequest, PaymentMethodOrder } from 'src/app/models/order-request.model';
import { OrderService } from 'src/app/service/users/order.service';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { PaymentsMethodsService } from 'src/app/service/producer/payments-methods.service';
import { Order } from 'src/app/models/order.model';
import { AddUpdateAddressComponent } from './add-update-address/add-update-address.component';

import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

import icAlert from '@iconify/icons-ic/twotone-notifications-active';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import icPayment from '@iconify/icons-ic/twotone-payment';
import icTotal from '@iconify/icons-ic/twotone-attach-money';

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

  icAlert = icAlert;
  icDoneAll = icDoneAll;
  icPayment = icPayment;
  icTotal = icTotal;

  orderRequest: OrderRequest[] = [];

  idConsumer: string;

  total: number = 0;

  limitPaymentDate: Date;

  paymentMethodsSelected: PaymentMethod[] = [];

  paymentSelected: PaymentMethod;

  address: Address;

  paymentMethodsOrders: PaymentMethodOrder[] = [];

  loading: boolean = false;
  
  imageDefault: string = './assets/illustrations/no-product.png';

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private addressService: AddressesService,
    private cartService: CartService,
    private orderService: OrderService,
    private paymentMethodsService: PaymentsMethodsService,
    private notificationsService: NotificationsService
  ) {
    this.paymentSelected = new PaymentMethod();
  }

  async ngOnInit() {
    this.loading = true;
    const { uid } = await this.authService.getCurrentUser();
    this.idConsumer = uid;
    this.addressService.getConsumerDoc(uid);
    this.cartService.getConsumerDoc(uid);
    this.getLimitPaymentDate();
    this.getAddress();
    this.getPreOrders(uid);
  }

  getAddress() {
    this.addressService.addresses.subscribe(addresses => {
      this.address = addresses[0];
    });
  }

  getPreOrders(id: string) {
    this.orderService.getOrderProducts(id).subscribe((data) => {
      this.orderRequest = data;
      this.getTotalValue();
      this.getPaymentMethods();
      this.setTotalByOrder();
      this.loading = false;
    });
  }

  getPaymentMethods() {
    for (const order of this.orderRequest) {
      let payment: PaymentMethodOrder;
      this.paymentMethodsService.getProducerDoc(order.idProducer);
      this.paymentMethodsService.paymentMethods.subscribe(data => {
        order.chosenPayment = data[data.length - 1 || 0];
        order.address = this.address;
        payment = {
          idProducer: order.idProducer,
          name: order.names + ' ' + order.lastnames,
          paymentMethods: data
        }
        if (!this.paymentMethodsOrders.includes(payment)) {
          this.paymentMethodsOrders.push(payment);
        }
      });
    }
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

  getLimitPaymentDate() {
    this.limitPaymentDate = this.orderService.setPaymentLimitDate();
  }

  addNewAddress() {
    this.dialog.open(AddUpdateAddressComponent).afterClosed().subscribe(address => {
      if (address) {
        this.addressService.addAddress(null, address).then(() => {
          this.addNewAddresToOrder(address);
          this.snackbar.open('Tu dirección ha sido guardada satisfactoriamente', 'OK', {
            duration: 2000
          });
        });
      }
    });
  }

  updateAddressInfo(address: Address) {
    this.dialog.open(AddUpdateAddressComponent, {
      data: address
    }).afterClosed().subscribe(address => {
      if (address) {
        this.addNewAddresToOrder(address);
        this.addressService.addAddress(address.id, address).then(() => {
          this.snackbar.open('La información de tu dirección ha sido guardada satisfactoriamente', 'OK', {
            duration: 2000
          });
        });
      }
    });
  }

  addPaymentSelected(payment: PaymentMethod, idProducer: string) {
    this.orderRequest.forEach(order => {
      if (order.idProducer === idProducer && order.chosenPayment !== payment) {
        order.chosenPayment = payment;
      }
    });
  }

  addNewAddresToOrder(address: Address) {
    this.orderRequest.forEach(order => order.address = address);
  }

  setTotalByOrder() {
    this.orderRequest.forEach(order => {
      let total = 0;
      order.products.forEach(product => {
        total += product.subtotal;
      })
      order.total = total;
    });
  }

  confirmOrder() {
    this.orderRequest.forEach((orderRequest, index) => {
      const order: Order = this.orderService.confirmOrder(orderRequest, this.idConsumer);
      this.orderService.saveOrder(order).then(id => {
        if (index === this.orderRequest.length - 1) {
          this.cartService.removeAllProductsFromShoppingCart().then(() => {});
          this.router.navigateByUrl('')
          this.snackbar.open(index > 0 ? 'Pedidos confirmados!!!' : 'Pedido confirmado!!!', '✔✔', {
            duration: 2000
          });
        }
        this.sendNotification(order);
      }, (err) =>  {
        console.log(err);
        
        this.snackbar.open('Ooops! Ocurrió un error al confirmar el pedido', '❌❌', {
          duration: 2000
        });
      });
    });
  }

  sendNotification(order: Order) {
      this.notificationsService.sendPurchaseRequest(order)
        .subscribe();
  }

}
