import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import { MenuHome } from './toolbar-user/interfaces/menu-home';
import { CartService } from 'src/app/service/consumer/cart.service';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/service/users/users.service';
import { ProductsService } from 'src/app/service/producer/products.service';
import { Product } from 'src/app/models/product.model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import icSearch from '@iconify/icons-ic/twotone-search';
import icArrow from '@iconify/icons-ic/twotone-arrow-right-alt';
import icClose from '@iconify/icons-ic/twotone-close';
import icHome from '@iconify/icons-ic/twotone-home';
import icShoppingCart from '@iconify/icons-ic/twotone-shopping-cart';
import icLocalShipping from '@iconify/icons-ic/twotone-local-shipping';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icPerson from '@iconify/icons-ic/twotone-person';
import faApple from '@iconify/icons-fa-solid/apple-alt';
import faCarrot from '@iconify/icons-fa-solid/carrot';
import faInfo from '@iconify/icons-fa-solid/info';
import faLeaf from '@iconify/icons-fa-solid/leaf';
import faPhone from '@iconify/icons-fa-solid/phone';
import faSpa from '@iconify/icons-fa-solid/spa';
import faTractor from '@iconify/icons-fa-solid/tractor';
import faShippingFast from '@iconify/icons-fa-solid/shipping-fast';
import { OrderService } from 'src/app/service/users/order.service';

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
  icShoppingCart = icShoppingCart;
  icLocalShipping = icLocalShipping;
  icMenu = icMenu;
  icPerson = icPerson;
  faApple = faApple;
  faCarrot = faCarrot;
  faLeaf = faLeaf;
  faInfo = faInfo;
  faPhone = faPhone;
  faSpa = faSpa;
  faTractor = faTractor;
  faShippingFast = faShippingFast;


  // Variable que almacena el displayName del usuario en sesion
  public userDisplayName: string;

  /**
   * Bandera valida si exisre un usuario en sesi??n
   */
  isLogged = false;

  /**
   * Bandera que valida si el usuario en sesi??n es un productor o un transportador
   */
  isWorker: boolean = false;

  /**
   * Arreglo del men?? que se muestra en la vista
   */
  menu: MenuHome[] = [
    {
      name: 'PRODUCTOS',
      children: [
        {
          name: 'Frutas',
          icon: faApple,
          router: '/productos/frutas'
        },
        {
          name: 'Tub??rculos',
          icon: faCarrot,
          router: '/productos/tuberculos'
        },
        {
          name: 'Hortalizas',
          icon: faSpa,
          router: '/productos/hortalizas'
        },
        {
          name: 'Hierbas y arom??ticas',
          icon: faLeaf,
          router: '/productos/hierbas'
        }
      ]
    },
    {
      name: 'USUARIOS',
      children: [
        {
          name: 'Productores',
          icon: faTractor,
          router: '/productores'
        },
        {
          name: 'Transportadores',
          icon: faShippingFast,
          router: '/transportadores'
        }
      ]
    },
    {
      name: 'SPC',
      children: [
        {
          name: '??Qui??nes somos?',
          icon: faInfo,
          router: '/quienes-somos'
        },
        {
          name: 'Cont??ctanos',
          icon: faPhone,
          router: '/contactanos/'
        }
      ]
    }
  ]

  /**
   * Variable que almacena la cantidad de productos que hay
   * en el carrito del productor
   */
  cartSize: number;

  ordersSize: number;

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
    private orderService: OrderService) { }

  /**
   * M??todo que se ejecuta una vez se inicializa el componente
   */
  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.isLogged = true;
      this.userDisplayName = user.displayName;
      this.cartService.getConsumerDoc(user.uid);
      this.getUserRole(user.uid);
    }
  }

  /**
   * M??todo que obtiene el role del usuario en sesi??n del
   * para validar el men?? del carrito o las ??rdenes
   * @param uid id del usuario en sesi??n
   */
  getUserRole(uid: string) {
    this.userService.getUserInfo(uid).subscribe(({ typeuser }) => {
      if (typeuser === 'Productor' || typeuser === 'Transportador') {
        this.isWorker = true;
      }
      this.countProducts(typeuser, uid);
    });
  }

  /**
   * M??todo que cuenta los productos que se encuentran la respectiva colecci??n
   * de carrito o ??rdenes seg??n el role del usuario en sesi??n
   * @param role el campo de 'typeuser' del documento del usuario en sesi??n
   */
  countProducts(role: string, uid: string): void {
    if (role == 'Consumidor') {
      this.cartService.shoppingsCart
        .subscribe(res => this.cartSize = res.length);
    } else {
      this.orderService.getOrdersByUser(uid, (role === 'Productor' ? 'idProducer' : 'idCarrier'))
        .subscribe(res => this.ordersSize = res.length);
    }
  }

}
