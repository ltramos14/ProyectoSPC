import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { PaymentsMethodsService } from 'src/app/service/producer/payments-methods.service';

import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPermIdentity from '@iconify/icons-ic/twotone-perm-identity';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'app-create-update-payment-method',
  templateUrl: './create-update-payment-method.component.html'
})
export class CreateUpdatePaymentMethodComponent implements OnInit {

  icAttachMoney = icAttachMoney;
  icPhone = icPhone;
  icPermIdentity = icPermIdentity;
  icClose = icClose;

  mode: 'create' | 'update' = 'create';

  formPaymentMethod: FormGroup;

  selectorPaymentMethods: String;

  imageDefault: string = '../../../../../assets/images/logotipos/LogoSPCv1.png';

  PaymentOptions = ['Nequi', 'Daviplata', 'Movii', 'Efecty', 'Paga Todo Para Todo!', 'Vía Baloto'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateUpdatePaymentMethodComponent>,
    private paymentMethodService: PaymentsMethodsService) {
  }

  ngOnInit() {

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
      this.defaults = {} as PaymentMethod;
    }

    this.formPaymentMethod = this.fb.group({
      id: [this.defaults.id || ''],
      payment: [
        this.defaults.name || '',
        Validators.required
      ],
      phone: [this.defaults.phone || '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]],
      identification: [this.defaults.identification || '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('[0-9]*')
      ]]
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createPaymentMethod();
    } else if (this.mode === 'update') {
      this.updatePaymentMethod();
    }
  }

  uploadPaymentMethodImage() {
    this.selectorPaymentMethods = this.formPaymentMethod.get('payment').value;

    switch (this.selectorPaymentMethods) {
      case 'Nequi':
        this.imageDefault = '../../../../../assets/images/medios-pago/nequi.png';
        break;
      case 'Daviplata':
        this.imageDefault = '../../../../../assets/images/medios-pago/daviplata.png';
        break;
      case 'Movii':
        this.imageDefault = '../../../../../assets/images/medios-pago/movii.png';
        break;
      case 'Efecty':
        this.imageDefault = '../../../../../assets/images/medios-pago/efecty.png';
        break;
      case 'Paga Todo Para Todo!':
        this.imageDefault = '../../../../../assets/images/medios-pago/paga-todo.jpg';
        break;
      case 'Vía Baloto':
        this.imageDefault = '../../../../../assets/images/medios-pago/via-baloto.png';
        break;
    }
  }

  createPaymentMethod() {
    let payment = new PaymentMethod();

    payment.name = this.formPaymentMethod.get("payment").value;
    payment.identification = this.formPaymentMethod.get("identification").value;
    payment.image = this.imageDefault;
    payment.phone = this.formPaymentMethod.get("phone").value;

    this.paymentMethodService.savePaymentMethod(null, payment).then(() => {
      this.snackbar.open(`El medio de pago fue añadido satisfactoriamente`, 'OK', {
        duration: 3000
      })
    })

    this.dialogRef.close(payment);
  }

  updatePaymentMethod() {
    let payment = new PaymentMethod();

    payment.name = this.formPaymentMethod.get("payment").value;
    payment.identification = this.formPaymentMethod.get("identification").value;
    payment.image = this.imageDefault;
    payment.phone = this.formPaymentMethod.get("phone").value;

    this.paymentMethodService.savePaymentMethod(this.defaults.id, payment).then(() => {
      this.snackbar.open(`El medio de pago fue editado satisfactoriamente`, 'OK', {
        duration: 3000
      })
    })

    this.dialogRef.close(this.defaults);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
