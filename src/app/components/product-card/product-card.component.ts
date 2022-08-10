import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/service/consumer/cart.service';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UsersService } from 'src/app/service/users/users.service';

import icMoney from '@iconify/icons-ic/twotone-attach-money';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icWait from '@iconify/icons-ic/twotone-access-time';
import icCart from '@iconify/icons-ic/twotone-add-shopping-cart';
import icNotification from '@iconify/icons-ic/twotone-notification-important';
import icBuyNow from '@iconify/icons-ic/twotone-monetization-on';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input('product') product: Product;

  icMoney = icMoney;
  icCheck = icCheck;
  icWait = icWait;
  icCart = icCart;
  icBuyNow = icBuyNow;
  icNotification = icNotification;

  products: Product[] = [];
  productCart: Cart;
  shoppingsCart: Cart[] = [];
  subscriptions: Subscription[] = [];

  isWorker: boolean = false;
  imageDefault: string = './assets/illustrations/no-product.png';
  user: any;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private userService: UsersService
  ) { }

  ngOnDestroy(): void {
    this.isWorker = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    this.user = user;

    if (user) {
      this.subscriptions.push(this.cartService.shoppingsCart.subscribe(cart => this.shoppingsCart = cart));
      this.subscriptions.push(this.userService.getUserInfo(user.uid).subscribe(({ typeuser }) => {
        if (typeuser === 'Productor' || typeuser === 'Transportador')
          this.isWorker = true;
      }));
    }
  }

  goToProductDetails(productId: string) {
    this.router.navigateByUrl('/detalles-producto', { skipLocationChange: true }).then(() => {
      this.router.navigate([`detalles-producto/${productId}`]);
    });
  }

  validateProductIdOnCartList(product: Product) {
    const cartExist = this.shoppingsCart.find(c => c.product.id === product.id);
    if (cartExist) {
      this.cartService.modifyQuantitysProduct(cartExist.id, 1, product.price)
        .then(() => {
          this.snackbar.open(
            `Cantidad del producto ${product.name} actualizada correctamente`,
            "OK",
            {
              duration: 2000,
            }
          );
        })
        .catch(err => false)
    } else {
      this.addProductToCart(product, false)
    }
  }

  addProductToCart(product: Product, buyNow: boolean) {
    if (this.user) {
      this.productCart = { product, quantity: 1, subtotal: product.price };

      this.cartService.addProductToShoppingCart(this.productCart).then(() => {
        if (!buyNow) {
          this.snackbar.open(`Producto agregado al carrito correctamente`, 'OK', {
            duration: 2000
          });
        }
      }, () => {
        this.snackbar.open(`Error al agregar el producto al carrito`, '❌', {
          duration: 2000
        });
      })
    } else {
      this.router.navigateByUrl('/iniciar-sesion');
    }
  }

  confirmOrder(product: Product) {
    this.addProductToCart(product, true);
    this.router.navigateByUrl('/solicitar-pedido')
  }

}
