import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdatePaymentMethodComponent } from './create-update-payment-method/create-update-payment-method.component';
import { PaymentsMethodsService } from 'src/app/service/producer/payments-methods.service';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Observable, ReplaySubject } from 'rxjs';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';

import icAttachMoney from "@iconify/icons-ic/twotone-attach-money";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icWeb from "@iconify/icons-ic/twotone-web";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-my-payment-methods',
  templateUrl: './my-payment-methods.component.html',
  animations: [
    fadeInUp400ms,
    fadeInRight400ms
  ],
})
export class MyPaymentMethodsComponent implements OnInit {

  icAttachMoney = icAttachMoney;
  icPhone = icPhone;
  icWeb = icWeb;
  icEdit = icEdit;
  icDelete = icDelete;

  imageDefault: string = '../../../../../assets/images/LogoSPCv1.png';

  subject$: ReplaySubject<PaymentMethod[]> = new ReplaySubject<PaymentMethod[]>(1);
  data$: Observable<PaymentMethod[]> = this.subject$.asObservable();
  paymentMethods: PaymentMethod[];
  selection = new SelectionModel<PaymentMethod>(true, []);

  public paymentMethod: any[] = [];

  constructor(
    private paymentMethodsService: PaymentsMethodsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit():void {

    if (this.getData() !== undefined) {
      this.getData().subscribe(paymentMethods => this.paymentMethods = paymentMethods);
    }
  }

  getData() {
    return this.paymentMethodsService.paymentMethods;
  }

  createPaymentMethod() {
    this.dialog.open(CreateUpdatePaymentMethodComponent);
  }

  updatePaymentMethod() {
    this.dialog.open(CreateUpdatePaymentMethodComponent, {
      //data: payment
    });
  }

  deletePaymentMethod(paymentMethod: PaymentMethod) {

    this.paymentMethodsService.deletePaymentMethod(paymentMethod.id).then(() => {
      this.paymentMethods.splice(this.paymentMethods.findIndex((existingPaymentMethod) => existingPaymentMethod.id === paymentMethod.id), 1);
      this.snackbar.open(`El medio de pago fue eliminado satisfactoriamente`, 'OK', {
        duration: 2000
      });
      this.selection.deselect(paymentMethod);
    }).catch(err => {
      this.snackbar.open(`Error: ${err.message}`, 'OK', {
        duration: 2000
      });
    })

  }

}
