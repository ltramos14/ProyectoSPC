import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/producer/products.service';
import { Product } from 'src/app/models/product.model';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import { Observable, ReplaySubject } from 'rxjs';

import icSpa from '@iconify/icons-ic/twotone-spa';
import icMoney from '@iconify/icons-ic/twotone-attach-money';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icCart from '@iconify/icons-ic/twotone-add-shopping-cart';
import icBuyNow from '@iconify/icons-ic/twotone-monetization-on';
import { CartService } from 'src/app/service/consumer/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ProductsCatalogComponent implements OnInit {

  icSpa = icSpa;
  icMoney = icMoney;
  icCheck = icCheck;
  icCart = icCart;
  icBuyNow = icBuyNow;

  subject$: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);

  data$: Observable<Product[]> = this.subject$.asObservable();

  products: Product[];

  productCart: Cart;

  constructor(
    private snackbar: MatSnackBar,
    private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getData().subscribe(products => this.products = products);
  }

  getData() {
    return this.productsService.products;
  }

  addProductToCart(product: Product) {
    this.productCart = { product, quantity: 1, subtotal: product.price };

    this.cartService.addProductToShoppingCart(this.productCart).then(() => {
      this.snackbar.open(`Producto agregado al carrito correctamente`, 'OK', {
        duration: 2000
      });
    }, err => console.error(err))

  }

}
