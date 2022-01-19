import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from './../../../service/producer/products.service';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/consumer/cart.service';

import icSpa from '@iconify/icons-ic/twotone-spa';
import icMoney from '@iconify/icons-ic/twotone-attach-money';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icCart from '@iconify/icons-ic/twotone-add-shopping-cart';
import icBuyNow from '@iconify/icons-ic/twotone-monetization-on';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  icSpa = icSpa;
  icMoney = icMoney;
  icCheck = icCheck;
  icCart = icCart;
  icBuyNow = icBuyNow;

  randProducts: Product[] = [];
  products: Product[] = [];
  productCart: Cart;

  responsiveOptions;


  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private snackbar: MatSnackBar,
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {

    this.productsService.products.subscribe((products) => {
      this.products = products;
      this.getRandomProducts();
    })
  }

  getRandomProducts() {
    for (let i = 0; i < 16; i++) {
      const rand = Math.floor(Math.random() * this.products.length);
      this.randProducts.push(this.products[rand]);
    }
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
