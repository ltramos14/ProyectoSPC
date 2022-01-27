import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/consumer/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';

import icMoney from '@iconify/icons-ic/twotone-attach-money';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icWait from '@iconify/icons-ic/twotone-access-time';
import icCart from '@iconify/icons-ic/twotone-add-shopping-cart';
import icBuyNow from '@iconify/icons-ic/twotone-monetization-on';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;

  icMoney = icMoney;
  icCheck = icCheck;
  icWait = icWait;
  icCart = icCart;
  icBuyNow = icBuyNow;

  products: Product[] = [];
  productCart: Cart;

  constructor(
    private cartService: CartService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
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
