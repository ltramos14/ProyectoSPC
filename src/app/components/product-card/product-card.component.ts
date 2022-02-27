import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/service/consumer/cart.service';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UsersService } from 'src/app/service/users/users.service';

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
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input('product') product: Product;

  icMoney = icMoney;
  icCheck = icCheck;
  icWait = icWait;
  icCart = icCart;
  icBuyNow = icBuyNow;

  products: Product[] = [];
  productCart: Cart;
  user: any;
  isWorker: boolean = false;
  imageDefault: string = '../../../../../assets/illustrations/no-product.png';

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private userService: UsersService
  ) { }
  ngOnDestroy(): void {
    this.isWorker = false;
  }

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    this.user = user;

    if (user) {
      this.userService.getUserInfo(user.uid).subscribe(({ typeuser }) => {
        if (typeuser === 'Productor' || typeuser === 'Transportador')
          this.isWorker = true;
      });
    }
  }

  goToProductDetails(productId: string) {
    this.router.navigateByUrl('/detalles-producto', { skipLocationChange: true }).then(() => {
      this.router.navigate([`detalles-producto/${productId}`]);
    });
  }

  addProductToCart(product: Product) {
    if( this.user ) {
      this.productCart = { product, quantity: 1, subtotal: product.price };

      this.cartService.addProductToShoppingCart(this.productCart).then(() => {
        this.snackbar.open(`Producto agregado al carrito correctamente`, 'OK', {
          duration: 2000
        });
      }, err => console.error(err))
    } else {
      this.router.navigateByUrl('/iniciar-sesion');
    }
  }

}
