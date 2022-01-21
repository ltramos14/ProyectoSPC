import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Cart } from "src/app/models/cart.model";
import { CartService } from "src/app/service/consumer/cart.service";

import icDelete from "@iconify/icons-ic/twotone-close";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth/auth.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  /**
   * Indica qué variables deben ser mostradas en la tabla
   */
  displayedColumns: string[] = [
    "product.image",
    "product.name",
    "product.price",
    "product.availability",
    "quantity",
    "subtotal",
    "delete",
  ];

  icDelete = icDelete;

  productsCart: Cart[];

  total: number = 0;
  

  /**
   * Es el origen de datos de la tabla
   */
  dataSource = new MatTableDataSource<Cart>();

  /**
   * Permite ordenar los datos de la tabla
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Permite paginar la tabla
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private cartSubscription: Subscription;

  /**
   * Constructor de UsuariosComponent
   * @param route objeto que permite cambiar de página
   * @param usuarioTransversalService objeto que permite usar los servicios relacionados con el usuario general
   * @param dialog objeto que permite invocar la venana modal
   */
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {
  }
  ngOnDestroy(): void {
    /* this.cartSubscription.unsubscribe(); */
  }
  
  /**
   * Método que se ejecuta al cargar la página
   */
  async ngOnInit() {
    const { uid } = await this.authService.getCurrentUser();
    this.cartService.getConsumerDoc(uid);
    this.getProductCartConsumer();
  }

  getProductCartConsumer() {
    this.cartSubscription =  this.cartService.shoppingsCart.subscribe((carts) => {
      this.productsCart = carts;
      this.dataSource = new MatTableDataSource(this.productsCart);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getTotalValue();
    });
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
      () => {},
      (err) => console.error(err)
    );
  }

  getTotalValue() {
    let tot = 0;
    this.productsCart.forEach((element) => {
      tot = tot + element.subtotal;
      this.total = tot;
    });
  }

  confirmOrder() {
    console.log('PEDIDO GENERADO');
    console.log(this.productsCart);
    
  }
}
