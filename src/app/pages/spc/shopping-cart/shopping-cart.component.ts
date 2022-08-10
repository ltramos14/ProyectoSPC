import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";

import { AuthService } from "src/app/service/auth/auth.service";
import { Cart } from "src/app/models/cart.model";
import { CartService } from "src/app/service/consumer/cart.service";
import { ProductsService } from "src/app/service/producer/products.service";
import { Product } from "src/app/models/product.model";

import icDelete from "@iconify/icons-ic/twotone-close";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  icDelete = icDelete;

  products: Product[]

  productsCart: Cart[];

  total: number = 0;

  responsiveOptions;

  loading: boolean = false;

  imageDefault: string = './assets/illustrations/no-product.png';

  displayedColumns: string[] = [
    "product.image",
    "product.name",
    "product.price",
    "product.stock",
    "quantity",
    "subtotal",
    "delete",
  ];

  dataSource: MatTableDataSource<Cart> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  /**
   * Constructor de UsuariosComponent
   * @param route objeto que permite cambiar de página
   * @param usuarioTransversalService objeto que permite usar los servicios relacionados con el usuario general
   * @param dialog objeto que permite invocar la venana modal
   */
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productsService: ProductsService,
    private router: Router,
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

  /**
   * Método que se ejecuta al cargar la página
   */
  async ngOnInit() {
    this.loading = true;
    this.dataSource = new MatTableDataSource();

    this.dataSource.sortingDataAccessor = (element, property) => {
      switch (property) {
        case 'product.name': return element.product.name;
        case 'product.price': return element.product.price;
        case 'product.stock': return element.product.stock;

        default: return element[property];
      }
    };

    const { uid } = await this.authService.getCurrentUser();

    this.cartService.getConsumerDoc(uid);

    this.getProducts();
    this.getProductCartConsumer();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProductCartConsumer() {
    this.cartService.shoppingsCart.subscribe((carts) => {
      this.productsCart = carts;
      this.dataSource.data = this.productsCart;
      this.getTotalValue();
      this.loading = false;
    });
  }

  getProducts() {
    this.productsService.getProductsWithQuery(16).subscribe((products) => {
      this.products = products;
    })
  }

  deleteProduct(idCart: string) {
    this.cartService.removeProductFromShoppingCart(idCart).then(
      () => {
        this.snackbar.open(`Producto eliminado del carrito de compras`, "OK", {
          duration: 2000,
        });
      },
      (err) => console.error(err)
    );
  }

  updateQuantity(idCart: string, price: number, quantity: any) {
    const newSubtotal = price * quantity;
    this.cartService.modifyQuantitysProduct(idCart, quantity, newSubtotal).then(
      () => { },
      (err) => console.error(err)
    );
  }

  getTotalValue() {
    let total = 0;

    if (this.productsCart.length > 0) {
      this.productsCart.forEach((element) => {
        total = total + element.subtotal;
        this.total = total;
      });
    } else {
      this.total = 0;
    }
  }

  confirmOrder() {
    this.router.navigateByUrl('/solicitar-pedido')
  }

}
