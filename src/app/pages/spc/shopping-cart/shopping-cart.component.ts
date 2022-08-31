import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";

import { AuthService } from "src/app/service/auth/auth.service";
import { Cart } from "src/app/models/cart.model";
import { CartService } from "src/app/service/consumer/cart.service";
import { MessageDialogComponent } from "src/app/components/message-dialog/message-dialog.component";
import { ProductsService } from "src/app/service/producer/products.service";
import { Product } from "src/app/models/product.model";

import icDelete from "@iconify/icons-ic/twotone-close";
import icDeleteForever from "@iconify/icons-ic/twotone-delete-forever";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  icDelete = icDelete;
  icDeleteForever = icDeleteForever;

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
    private dialog: MatDialog
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

  deleteAllProducts() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        message: '¿Está seguro de que desea vaciar el carrito de compras?',
        buttonText: {
          ok: "Sí, vaciar",
          cancel: "Cancelar"
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cartService.removeAllProductsFromShoppingCart()
          .then(() => 
            this.snackbar.open('Carrito de compras vaciado satisfactoriamente', 'OK', {
              duration: 3000 
            })
          )
          .catch(() => 
            this.snackbar.open('Error al vaciar el carrito de compras', 'OK', {
              duration: 2000 
            })
          )
      }
    })
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
