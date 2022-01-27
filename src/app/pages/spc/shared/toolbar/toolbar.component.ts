import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import { MenuHome } from './toolbar-user/interfaces/menu-home';

import icSearch from '@iconify/icons-ic/twotone-search';
import icHome from '@iconify/icons-ic/twotone-home';
import icShoppingCart from '@iconify/icons-ic/twotone-shopping-cart';
import icLocalShipping from '@iconify/icons-ic/twotone-local-shipping';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icPerson from '@iconify/icons-ic/twotone-person';
import icGrass from '@iconify/icons-ic/twotone-grass';
import icNature from '@iconify/icons-ic/twotone-nature';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icInfo from '@iconify/icons-ic/twotone-info';
import { CartService } from 'src/app/service/consumer/cart.service';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from 'src/app/service/users/users.service';
import { ProductsService } from 'src/app/service/producer/products.service';
import { Product } from 'src/app/models/product.model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  visibleSidebar2;

  /**
   * Iconos usados en el componente
  */
  icSearch = icSearch;
  icHome = icHome;
  icShoppingCart = icShoppingCart;
  icLocalShipping = icLocalShipping;
  icMenu = icMenu;
  icPerson = icPerson;

  // Variable que almacena el displayName del usuario en sesion
  public userDisplayName: string;

  /**
   * Bandera valida si exisre un usuario en sesión
   */
  isLogged = false;

  /**
   * Bandera que valida si el usuario en sesión es un productor o un transportador
   */
  isWorker: boolean = false;

  /**
   * Arreglo del menú que se muestra en la vista
   */
  menu: MenuHome[] = [
    {
      name: 'PRODUCTOS',
      children: [
        {
          name: 'Frutas',
          icon: icNature,
          router: '/inicio/productos'
        },
        {
          name: 'Verduras',
          icon: icGrass,
          router: '/inicio/productos'
        },
        {
          name: 'Hortalizas',
          icon: icGrass,
          router: '/inicio/productos'
        },
        {
          name: 'Hierbas y aromáticas',
          icon: icNature,
          router: '/inicio/productos'
        }
      ]
    },
    {
      name: 'USUARIOS',
      children: [
        {
          name: 'Productores',
          icon: icNature,
          router: '/productores'
        },
        {
          name: 'Transportadores',
          icon: icNature,
          router: '/transportadores'
        },
        {
          name: 'Consumidores',
          icon: icNature,
          router: '/consumidores'
        }
      ]
    },
    {
      name: 'SPC',
      children: [
        {
          name: '¿Quiénes somos?',
          icon: icInfo,
          router: '/inicio/quienes-somos'
        },
        {
          name: 'Contáctanos',
          icon: icPhone,
          router: '/inicio/contactanos'
        }
      ]
    }
  ]

  /**
   * Variable que almacena la cantidad de productos que hay
   * en el carrito del productor
   */
  cartSize: number;

  productsList: Product[] = [];

  productCtrl = new FormControl();

  filteredProducts: Observable<Product[]>;

  /**
   * Constructor que inyecta los siguientes servicios
   * @param authService 
   * @param userService 
   * @param cartService 
   * @param productService
   */
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private cartService: CartService,
    private productService: ProductsService) {
      this.filteredProducts = this.productCtrl.valueChanges.pipe(
        startWith(''),
        map(product => (product ? this._filterProducts(product) : this.productsList.slice())),
      );
    }

  /**
   * Método que se ejecuta una vez se inicializa el componente
   */  
  async ngOnInit() {
    this.getProducts();
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.isLogged = true;
      this.userDisplayName = user.displayName;
      this.cartService.getConsumerDoc(user.uid);
      this.getUserRole(user.uid);
    }
  }

  getProducts() {
    return this.productService.products.subscribe(data => this.productsList = data);
  }


  /**
   * Método que obtiene el role del usuario en sesión del
   * para validar el menú del carrito o las órdenes
   * @param uid id del usuario en sesión
   */
  getUserRole(uid: string) {
    this.userService.getUserInfo(uid).subscribe(({ typeuser }) => {
      if (typeuser === 'Productor' || typeuser === 'Transportador')
        this.isWorker = true;
      this.countProducts(typeuser);
    });
  }

  /**
   * Método que cuenta los productos que se encuentran la respectiva colección
   * de carrito o órdenes según el role del usuario en sesión
   * @param role el campo de 'typeuser' del documento del usuario en sesión
   */
  countProducts(role: string): void {
    if (role == 'Consumidor') {
      this.cartService.shoppingsCart
                                .subscribe(res => this.cartSize = res.length);
    } else if (role === 'Productor') {
      // TODO: Aqui se hace llamada al servicio de los pedidos realizados para el productor
      } else if (role === 'Transportador') {
        // TODO: Aqui se hace llamada al servicio de los pedidos realizados para el transportador
        }
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.productsList.filter(product => product.name.toLowerCase().includes(filterValue));
  }

}
