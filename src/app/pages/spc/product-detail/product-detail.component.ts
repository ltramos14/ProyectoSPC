import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductsService } from "src/app/service/producer/products.service";
import { UsersService } from "./../../../service/users/users.service";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";

import icCart from "@iconify/icons-ic/twotone-add-shopping-cart";
import icBuyNow from "@iconify/icons-ic/twotone-monetization-on";
import icCheck from "@iconify/icons-ic/twotone-check-circle";
import icWait from "@iconify/icons-ic/twotone-access-time";
import { CartService } from "src/app/service/consumer/cart.service";
import { Cart } from "src/app/models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "./../../../service/auth/auth.service";
import { User } from "src/app/interfaces/user.interface";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
  animations: [fadeInUp400ms],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
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
  setQuantity: number = 1;
  productCart: Cart;
  shoppingsCart: Cart[] = [];

  imageDefault: string = "../../../../../assets/illustrations/no-product.png";

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private productsService: ProductsService,
    private userService: UsersService,
    private cartService: CartService
  ) {
    this.validateWorker();
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.productsService.getProductById(id).subscribe((product) => {
      this.product = product;
      this.subscriptions.push(
        this.productsService
          .getProductsByType(product.productType)
          .subscribe((products) => {
            this.products = products;
          })
      );

      this.subscriptions.push(
        this.productsService
          .getProductsByIdProducer(product.idProducer)
          .subscribe((productsProducer) => {
            this.productsProducer = productsProducer;
          })
      );

      this.subscriptions.push(
        this.userService
          .getUserInfo(product.idProducer)
          .subscribe(
            ({ names, lastnames }) =>
              (this.producerName = names + " " + lastnames)
          )
      );

      this.subscriptions.push(
        this.cartService.shoppingsCart.subscribe(cart => this.shoppingsCart = cart)
      );

    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  async validateWorker() {
    const user = await this.authService.getCurrentUser();
    this.user = user;
    if (user) {
      this.subscriptions.push(
        this.userService.getUserInfo(user.uid).subscribe(({ typeuser }) => {
          if (typeuser === "Productor" || typeuser === "Transportador")
            this.isWorker = true;
        })
      );
    }
  }

  updateQuantity(quantity: any) {
    this.setQuantity = quantity;
  }

  validateProductIdOnCartList(product: Product) {
    const newSubtotal = product.price * this.setQuantity;
    const cartExist = this.shoppingsCart.find(c => c.product.id === product.id);
    if (cartExist) {
      this.cartService.modifyQuantitysProduct(cartExist.id, this.setQuantity, newSubtotal)
        .then(() => {
          this.snackbar.open(
            `Cantidad del producto ${ product.name } actualizada correctamente`,
            "OK",
            {
              duration: 2000,
            }
          );
        })
        .catch(err => false)
    } else {
      this.addProductToCart(product, newSubtotal)
    } 
  }

  addProductToCart(product: Product, subtotal: number) {
    if (this.user) {
      this.productCart = {
        product,
        quantity: this.setQuantity,
        subtotal,
      };

      this.cartService.addProductToShoppingCart(this.productCart).then(
        () => {
          this.snackbar.open(
            `Producto ${ product.name } agregado al carrito correctamente`,
            "OK",
            {
              duration: 2000,
            }
          );
        },
        (err) => {
          this.snackbar.open(
            `Ocurrió un error al agregar el producto: ${product.name} al carrito`,
            "OK",
            {
              duration: 2000,
            }
          );
        }
      );
    } else {
      this.router.navigateByUrl("/iniciar-sesion");
    }
  }
}
