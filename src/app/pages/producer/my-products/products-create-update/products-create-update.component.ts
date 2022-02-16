import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Product } from '../../../../models/product.model';
import { ProductsService } from 'src/app/service/producer/products.service';
import { Farm } from 'src/app/models/farm.model';
import { FarmsService } from 'src/app/service/producer/farms.service';

import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icCalendar from '@iconify/icons-ic/twotone-calendar-today';
import icClose from '@iconify/icons-ic/twotone-close';
import icDescription from '@iconify/icons-ic/twotone-description';
import icEventAvailable from '@iconify/icons-ic/twotone-event-available';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icNature from '@iconify/icons-ic/twotone-nature';
import icTimeLine from '@iconify/icons-ic/twotone-timeline';
import icToc from '@iconify/icons-ic/twotone-toc';

@Component({
  selector: 'app-products-create-update',
  templateUrl: './products-create-update.component.html'
})
export class ProductsCreateUpdateComponent implements OnInit {

  icAttachMoney = icAttachMoney;
  icCalendar = icCalendar;
  icClose = icClose;
  icDescription = icDescription;
  icEventAvailable = icEventAvailable;
  icNature = icNature;
  icMyLocation = icMyLocation;
  icTimeLine = icTimeLine;
  icToc = icToc;

  mode: 'create' | 'update' = 'create';
  
  formProduct: FormGroup;
  
  product: Product;

  farm: Farm[];
  
  urlFile: File;

  value: number = 0;

  seconds: number = 0;

  imageUrl: string;

  imageDefault: string = '../../../../../assets/images/logotipos/LogoSPCv1.png';


  productTypePrefixOptions = ['Frutas', 'Hortalizas', 'Tubérculos', 'Granos', 'Hierbas y aromáticas'];
  
  unitPrefixOptions = ['Media libra', 'Libra', 'Kilo', 'Arroba', 'Paquete'];
  
  statePrefixOptions = ['Disponible', 'En cosecha'];

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductsCreateUpdateComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private productService: ProductsService,
    private farmsService: FarmsService) {
  }

  ngOnInit() {

    this.getFarmsData();

    if (this.defaults.idUser) {
      this.mode = 'create';
    } else if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Product;
    }

    this.formProduct = this.fb.group({
      id: [this.defaults.id || ''],
      idProducer: [this.defaults.idProducer, ''],
      name: [this.defaults.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[A-Za-z ]{2,254}')
      ]],
      productType: [
        this.defaults.productType || '',
        Validators.required,
      ],
      stock: [this.defaults.stock || '', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('[0-9]*')
      ]],
      price: [this.defaults.price || '', [
        Validators.required,
        Validators.min(100),
        Validators.pattern('[0-9]*')
      ]],
      unit: [
        this.defaults.unit || '',
        Validators.required
      ],
      productiveStatus: [
        this.defaults.productiveStatus || '',
        Validators.required,
      ],
      farm: [
        this.defaults.farm || this.farm,
        Validators.required
      ],
      available_date: [this.defaults.available_date || '', [
        //OwnValidations.futureDate
      ]],
      description: [this.defaults.description || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]],
      image: [this.defaults.image || '']
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
    let productToCreate = this.convertToProduct();
    this.productService.uploadProductImage(null, productToCreate, this.urlFile);
    this.dialogRef.close(this.product);
  }

  async updateProduct() {
    let productToEdit = this.convertToProduct();
    this.productService.uploadProductImage(productToEdit.id, productToEdit, this.urlFile);
    this.dialogRef.close(this.defaults);
  }

  convertToProduct(): Product {
    let product = new Product();

    product.id = this.formProduct.get('id').value;
    product.idProducer = this.formProduct.get('idProducer').value || this.data.idUser;
    product.name = this.formProduct.get('name').value;
    product.farm = this.formProduct.get('farm').value;
    product.productType = this.formProduct.get('productType').value;
    product.price = this.formProduct.get('price').value;
    product.stock = this.formProduct.get('stock').value;
    product.unit = this.formProduct.get('unit').value;
    product.productiveStatus = this.formProduct.get('productiveStatus').value;

    if (this.formProduct.get('productiveStatus').value === 'Disponible')
      product.availabilityDate = new Date();
    else
      product.availabilityDate = this.formProduct.get('available_date').value;

    product.description = this.formProduct.get('description').value;
    product.image = this.formProduct.get('image').value;
    return product;
  }

  async getFarmsData() {
    const { uid } = await this.authService.getCurrentUser(); 
    this.farmsService.getProducerDoc(uid);
    this.farmsService.farms.subscribe(data => {
      this.farm = data;
    });
  }

  showPreviewImage(event: Event) {
    for (let i = 0; i <= 100; i++) {
      this.value = i;
    }

    const file = (event.target as HTMLInputElement).files[0];
    this.urlFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;

    }
    reader.readAsDataURL(file);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
