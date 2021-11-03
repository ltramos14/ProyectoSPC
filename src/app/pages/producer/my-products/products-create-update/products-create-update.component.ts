import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../models/product.model';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icCalendar from '@iconify/icons-ic/twotone-calendar-today';
import icClose from '@iconify/icons-ic/twotone-close';
import icDescription from '@iconify/icons-ic/twotone-description';
import icEventAvailable from '@iconify/icons-ic/twotone-event-available';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icNature from '@iconify/icons-ic/twotone-nature';
import icTimeLine from '@iconify/icons-ic/twotone-timeline';
import icToc from '@iconify/icons-ic/twotone-toc';
import { OwnValidations } from 'src/app/service/helpers/ownValidations';

@Component({
  selector: 'vex-products-create-update',
  templateUrl: './products-create-update.component.html'
})
export class ProductsCreateUpdateComponent implements OnInit {

  formProduct: FormGroup;
  mode: 'create' | 'update' = 'create';

  productTypePrefixOptions = ['Fruta', 'Vegetal', 'Hortaliza'];
  unitPrefixOptions = ['Kilogramos', 'Libras', 'Bultos', 'Arrobas'];
  statePrefixOptions = ['Disponible', 'En cosecha'];
  farmPrefixOptions = ['Finca 1', 'Finca 2', 'Finca 3'];

  icAttachMoney = icAttachMoney;
  icCalendar = icCalendar;
  icClose = icClose;
  icDescription = icDescription;
  icEventAvailable = icEventAvailable;
  icNature = icNature;
  icMyLocation = icMyLocation;
  icTimeLine = icTimeLine;
  icToc = icToc;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<ProductsCreateUpdateComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Product;
    }

    this.formProduct = this.fb.group({
      name: [this.defaults.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      productType: [
        this.productTypePrefixOptions[3],
        Validators.required,
      ],
      price: [this.defaults.price || '', [
        Validators.required,
        Validators.min(0)
      ]],
      unit: [
        this.unitPrefixOptions[4],
        Validators.required
      ],
      productive_state: [
        this.statePrefixOptions[2],
        Validators.required
      ],
      farm: [
        this.farmPrefixOptions[3],
        Validators.required
      ],
      available_date: [this.defaults.available_date || '', [
        Validators.required,
        //OwnValidations.futureDate
      ]],
      description: [this.defaults.description || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)
      ]]
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const customer = this.formProduct.value;

    if (!customer.imageSrc) {
      customer.imageSrc = 'assets/img/avatars/1.jpg';
    }

    this.dialogRef.close(customer);
  }

  updateCustomer() {
    const customer = this.formProduct.value;
    customer.id = this.defaults.id;

    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
