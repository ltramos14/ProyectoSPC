import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import icPermIdentity from "@iconify/icons-ic/twotone-perm-identity";
import icWeb from "@iconify/icons-ic/twotone-web";
import icMail from "@iconify/icons-ic/twotone-mail";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPlace from "@iconify/icons-ic/twotone-place";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icClose from '@iconify/icons-ic/twotone-close';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/service/producer/products.service';
import { ProductsCreateUpdateComponent } from '../../../my-products/products-create-update/products-create-update.component';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {

  formUpdateProfile: FormGroup;
  mode: 'create' | 'update' = 'create';

  unitPrefixOptions = ['Kilogramos', 'Libras', 'Bultos', 'Arrobas'];

  icPermIdentity = icPermIdentity;
  icWeb = icWeb;
  icMail = icMail;
  icPhone = icPhone;
  icPlace = icPlace;
  icEdit = icEdit;
  icClose = icClose;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<ProductsCreateUpdateComponent>,
              private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private productService: ProductsService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Product;
    }

    this.formUpdateProfile = this.fb.group({
      id: [this.defaults.id || ''],
      name: [this.defaults.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      lastnames: [this.defaults.lastnames || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      phone: [this.defaults.phone || '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]],
      productive_state: [
        this.unitPrefixOptions[2],
        Validators.required
      ],
    });
  }

  saveChanges() {
    this.updateProfile();
  }

  async updateProfile() {
    const product = this.formUpdateProfile.value;
    product.id = this.defaults.id;
    await this.productService.saveProduct(product, product.id).then(() => {
      this.snackbar.open("Producto creado satisfatoriamente", 'OK', {
        duration: 3000
      });
    }).catch(err => {
      this.snackbar.open(`Error: ${ err.message }`, 'OK', {
        duration: 3000
      });
    })
    this.dialogRef.close(product);
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
