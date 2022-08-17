import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Product } from '../../../../models/product.model';
import { ProductsService } from 'src/app/service/producer/products.service';
import { Farm } from 'src/app/models/farm.model';
import { FarmsService } from 'src/app/service/producer/farms.service';
import { OwnValidations } from 'src/app/service/helpers/ownValidations';

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
  selector: "app-products-create-update",
  templateUrl: "./products-create-update.component.html",
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

  mode: "create" | "update" = "create";

  formProduct: FormGroup;

  product: Product;

  farm: Farm[];

  urlFile: File;

  value: number = 0;

  seconds: number = 0;

  imageUrl: string;

  imageDefault: string = './assets/illustrations/no-product.png';

  idUser: string;

  productTypePrefixOptions = [
    "Frutas",
    "Hortalizas",
    "Tubérculos",
    "Granos",
    "Hierbas y aromáticas",
  ];

  unitPrefixOptions = ["Media libra", "Libra", "Kilo", "Arroba", "Paquete"];

  statePrefixOptions = ["Disponible", "En cosecha"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ProductsCreateUpdateComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private productService: ProductsService,
    private farmsService: FarmsService
  ) {}

  ngOnInit() {
    this.getFarmsData();

    if (this.defaults instanceof Object) {
      this.mode = "update";
    } else {
      this.mode = "create";
      this.idUser = this.defaults;
    }

    this.getFarmsData();

    this.formProduct = this.fb.group({
      id: [this.defaults.id || ""],
      idProducer: [this.defaults.idProducer, ""],
      name: [
        this.defaults.name || "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern("[A-Za-zÀ-ÿ\u00f1\u00d1 ]{2,254}"),
        ],
      ],
      productType: [this.defaults.productType || "", Validators.required],
      stock: [
        this.defaults.stock || "",
        [Validators.required, Validators.min(1), Validators.pattern("[0-9]*")],
      ],
      price: [
        this.defaults.price || "",
        [
          Validators.required,
          Validators.min(100)
        ],
      ],
      unit: [this.defaults.unit || "", Validators.required],
      productiveStatus: [
        this.defaults.productiveStatus || "",
        Validators.required,
      ],
      farm: [this.defaults.farm || this.farm, Validators.required],
      availabilityDate: [
        this.defaults.availabilityDate || "",
        [OwnValidations.futureDate],
      ],
      description: [
        this.defaults.description || "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      image: [this.defaults.image || ""],
    });
  }

  saveChanges() {
    if (this.mode === "create") {
      this.createProduct();
    } else if (this.mode === "update") {
      this.updateProduct();
    }
  }

  convertToProduct(): Product {
    let product = new Product();

    product.id = this.formProduct.get("id").value;
    product.idProducer =
      this.formProduct.get("idProducer").value || this.idUser;
    product.name = this.formProduct.get("name").value;
    product.farm = this.formProduct.get("farm").value;
    product.productType = this.formProduct.get("productType").value;
    product.price = this.formProduct.get("price").value;
    product.stock = this.formProduct.get("stock").value;
    product.unit = this.formProduct.get("unit").value;
    product.productiveStatus = this.formProduct.get("productiveStatus").value;

    if (this.formProduct.get("productiveStatus").value === "Disponible")
      product.availabilityDate = null;
    else
      product.availabilityDate = this.formProduct.get("availabilityDate").value;

    product.description = this.formProduct.get("description").value;
    product.image = this.formProduct.get("image").value;

    return product;
  }

  createProduct() {
    let productToCreate = this.convertToProduct();
    this.productService.uploadProductImage(null, productToCreate, this.urlFile);
    this.dialogRef.close(this.product);
  }

  updateProduct() {
    let productToEdit = this.convertToProduct();
    this.productService.uploadProductImage(
      productToEdit.id,
      productToEdit,
      this.urlFile
    );
    this.dialogRef.close(this.defaults);
  }

  async getFarmsData() {
    const { uid } = await this.authService.getCurrentUser();
    this.farmsService.getProducerDoc(uid);
    this.farmsService.farms.subscribe((data) => {
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
    };
    reader.readAsDataURL(file);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  setValidatorAvailabilityDateField(value: any) {
    if (value.value === "Disponible") {
      this.formProduct.controls["availabilityDate"].clearValidators()
    } else {
      this.formProduct.get('availabilityDate').setValue(new Date());
      this.formProduct.controls["availabilityDate"].setValidators([Validators.required, OwnValidations.futureDate])
    }
  }
}
