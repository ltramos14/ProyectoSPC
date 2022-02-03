import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/service/producer/products.service';
import { UsersService } from './../../../service/users/users.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

import icCart from '@iconify/icons-ic/twotone-add-shopping-cart';
import icBuyNow from '@iconify/icons-ic/twotone-monetization-on';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icWait from '@iconify/icons-ic/twotone-access-time';
import { CartService } from 'src/app/service/consumer/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../../service/auth/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [
    fadeInUp400ms,
  ],
})
export class ProductDetailComponent implements OnInit {

  icCart = icCart;
  icBuyNow = icBuyNow;
  icCheck = icCheck;
  icWait = icWait;

  responsiveOptions;

  isWorker: boolean = false;
  user: any;

  product: Product;
  products: Product[] = [];
  productsProducer: Product[] = [];
  producerName: string;
  setQuantity: number;
  productCart: Cart;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private productsService: ProductsService,
    private userService: UsersService,
    private cartService: CartService,
  ) {
    this.validateWorker();
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
    
    this.route.params.subscribe(data => {
      this.productsService.getProductById(data.id).subscribe(product => {
        this.product = product;

        this.productsService.getProductsByType(product.productType).subscribe(products => {
          this.products = products;
        });

        this.productsService.getProductsByIdProducer(product.idProducer).subscribe(productsProducer => {
          this.productsProducer = productsProducer;
        });

        this.userService.getUserInfo(product.idProducer).subscribe(({ names, lastnames }) =>
          this.producerName = names + " " + lastnames);
      });
    })
  }

  async validateWorker() {
    const user = await this.authService.getCurrentUser();
    this.user = user;
    if (user) {
      this.userService.getUserInfo(user.uid).subscribe(({ typeuser }) => {
        if (typeuser === 'Productor' || typeuser === 'Transportador')
          this.isWorker = true;
      });
    }
  }

  updateQuantity(quantity: any) {
    this.setQuantity = quantity;
  }

  addProductToCart(product: Product) {
    if (this.user) {
      const newSubtotal = product.price * this.setQuantity;
      this.productCart = { product, quantity: this.setQuantity, subtotal: newSubtotal };
  
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
