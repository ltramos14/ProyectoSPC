import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import icSearch from '@iconify/icons-ic/twotone-search';
import icHome from '@iconify/icons-ic/twotone-home';
import icShoppingCart from '@iconify/icons-ic/twotone-shopping-cart';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icPerson from '@iconify/icons-ic/twotone-person';
import icGrass from '@iconify/icons-ic/twotone-grass';
import icNature from '@iconify/icons-ic/twotone-nature';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icInfo from '@iconify/icons-ic/twotone-info';
import { AuthService } from '../../../../service/auth/auth.service';
import { MenuHome } from './toolbar-user/interfaces/menu-home';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  visibleSidebar2;

  icSearch = icSearch;
  icHome = icHome;
  icShoppingCart = icShoppingCart;
  icMenu = icMenu;
  icPerson = icPerson;

  public userDisplayName: string;

  isLogged = false;
  
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

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.isLogged = true;
      this.userDisplayName = user.displayName;
    }
  }

}
