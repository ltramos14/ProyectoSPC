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
import { ProductsService } from 'src/app/service/producer/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'vex-products-create-update',
  templateUrl: './products-create-update.component.html'
})
export class ProductsCreateUpdateComponent implements OnInit {

  formProduct: FormGroup;
  mode: 'create' | 'update' = 'create';

  imageDefault: string = '../../../../../assets/illustrations/file-product.png';

  productTypePrefixOptions = ['Frutas', 'Hortalizas', 'Tubérculos', 'Granos', 'Hierbas y aromáticas'];
  unitPrefixOptions = ['Media libra', 'Libra', 'Kilo', 'Arroba', 'Paquete'];
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

  public product: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ProductsCreateUpdateComponent>,
              private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private productService: ProductsService) {
  }

  ngOnInit() {

    if (this.defaults.idUser) {
      this.mode = 'create';
    } else if (this.defaults) {
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
        this.defaults.productType || this.productTypePrefixOptions,
        Validators.required,
      ],
      price: [this.defaults.price || '', [
        Validators.required,
        Validators.min(0)
      ]],
      unit: [
        this.defaults.unit || this.unitPrefixOptions,
        Validators.required
      ],
      productiveStatus: [
        this.defaults.productiveStatus || this.statePrefixOptions,
        Validators.required,
      ],
      farm: [
        this.defaults.farm ||this.farmPrefixOptions,
        Validators.required
      ],
      available_date: [this.defaults.available_date || '', [
        //OwnValidations.futureDate
      ]],
      description: [this.defaults.description || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)
      ]],
    });
  }
  
  save() {
    if (this.mode === 'create') {
      this.createProduct();
    } else if (this.mode === 'update') {
      this.updateProduct();
    }
  }

  createProduct() {
   this.product = new Product();
   console.log(this.data.idUser)
   this.product.idProducer = this.data.idUser;
   this.product.farm = this.formProduct.get('farm').value;
   this.product.productType = this.formProduct.get('productType').value;
   this.product.name = this.formProduct.get('name').value;
   this.product.price = this.formProduct.get('price').value;
   this.product.unit = this.formProduct.get('unit').value;
   this.product.productiveStatus = this.formProduct.get('productiveStatus').value;
   
   if (this.formProduct.get('productiveStatus').value === 'Disponible')
    this.product.availabilityDate = new Date();
    else
      this.product.availabilityDate = this.formProduct.get('available_date').value;
   
   this.product.description = this.formProduct.get('description').value;
   this.product.image = "Aqui va la ruta de imagen de Storage";
   console.log(this.product);
  
    this.productService.saveProduct(this.product, null).then(() => {
      this.snackbar.open("Producto creado satisfatoriamente", 'OK', {
        duration: 3000
      });
    }).catch(err => console.log(err.message));
    this.dialogRef.close(this.product);
    /* if (!product.) {
      customer.imageSrc = 'assets/img/avatars/1.jpg';
    } */
  }

  async updateProduct() {
    this.defaults.farm = this.formProduct.get('farm').value;
    this.defaults.productType = this.formProduct.get('productType').value;
    this.defaults.name = this.formProduct.get('name').value;
    this.defaults.price = this.formProduct.get('price').value;
    this.defaults.unit = this.formProduct.get('unit').value;
    this.defaults.productiveStatus = this.formProduct.get('productiveStatus').value;

    await this.productService.saveProduct(this.defaults, this.defaults.id).then(() => {
      this.snackbar.open("Producto creado satisfatoriamente", 'OK', {
        duration: 3000
      });
    }).catch(err => {
      this.snackbar.open(`Error: ${ err.message }`, 'OK', {
        duration: 3000
      });
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
