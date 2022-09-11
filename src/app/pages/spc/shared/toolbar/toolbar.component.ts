import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import { MenuHome } from './toolbar-user/interfaces/menu-home';
import { CartService } from 'src/app/service/consumer/cart.service';
import { UsersService } from 'src/app/service/users/users.service';
import { OrderService } from 'src/app/service/users/order.service';

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
          icon: faApple,
          router: '/productos/frutas'
        },
        {
          name: 'Tubérculos',
          icon: faCarrot,
          router: '/productos/tuberculos'
        },
        {
          name: 'Hortalizas',
          icon: faSpa,
          router: '/productos/hortalizas'
        },
        {
          name: 'Hierbas y aromáticas',
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
          router: '/usuarios/productores'
        },
        {
          name: 'Transportadores',
          icon: faShippingFast,
          router: '/usuarios/transportadores'
        }
      ]
    },
    {
      name: 'SPC',
      children: [
        {
          name: '¿Quiénes somos?',
          icon: faInfo,
          router: '/quienes-somos'
        },
        {
          name: 'Contáctanos',
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
   * Método que se ejecuta una vez se inicializa el componente
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
   * Método que obtiene el role del usuario en sesión del
   * para validar el menú del carrito o las órdenes
   * @param uid id del usuario en sesión
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
   * Método que cuenta los productos que se encuentran la respectiva colección
   * de carrito o órdenes según el role del usuario en sesión
   * @param role el campo de 'typeuser' del documento del usuario en sesión
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
