import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Cart } from "src/app/models/cart.model";
import { CartService } from "src/app/service/consumer/cart.service";

import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth/auth.service";
import { ProductsService } from "src/app/service/producer/products.service";
import { Product } from "src/app/models/product.model";
import icDelete from "@iconify/icons-ic/twotone-close";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  /**
   * 
   */
  icDelete = icDelete;

  /**
   * Indica qué variables deben ser mostradas en la tabla
   */
  displayedColumns: string[] = [
    "product.image",
    "product.name",
    "product.price",
    "product.stock",
    "quantity",
    "subtotal",
    "delete",
  ];

  /**
   * 
   */
  products: Product[]

  /**
   * 
   */
  productsCart: Cart[];

  /**
   * 
   */
  total: number = 0;

  /**
   * Es el origen de datos de la tabla
   */
  dataSource: MatTableDataSource<Cart> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private cartSubscription: Subscription;

  responsiveOptions;

  /**
   * Constructor de UsuariosComponent
   * @param route objeto que permite cambiar de página
   * @param usuarioTransversalService objeto que permite usar los servicios relacionados con el usuario general
   * @param dialog objeto que permite invocar la venana modal
   */
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private snackbar: MatSnackBar,
    private productsService: ProductsService
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
  ngOnDestroy(): void {
    /* this.cartSubscription.unsubscribe(); */
  }

  /**
   * Método que se ejecuta al cargar la página
   */
  async ngOnInit() {

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

    this.getProductCartConsumer();
    this.getProducts();
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
    console.log('PEDIDO GENERADO');
    console.log(this.productsCart);
  }

}
