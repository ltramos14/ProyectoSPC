import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../@vex/services/layout.service';
import icSearch from '@iconify/icons-ic/twotone-search';
import icHome from '@iconify/icons-ic/twotone-home';
import icShoppingCart from '@iconify/icons-ic/twotone-shopping-cart';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { ConfigService } from '../../../../../@vex/services/config.service';
import { map } from 'rxjs/operators';
import { NavigationService } from '../../../../../@vex/services/navigation.service';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() mobileQuery: boolean;

  @Input()
  @HostBinding('class.shadow-b')
  hasShadow: boolean;

  navigationItems = this.navigationService.items;

  isHorizontalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'horizontal'));
  isVerticalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'vertical'));
  isNavbarInToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'in-toolbar'));
  isNavbarBelowToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'below-toolbar'));

  icSearch = icSearch;
  icHome = icHome;
  icShoppingCart = icShoppingCart;
  icMenu = icMenu;

  isLogged = false;

  constructor(private layoutService: LayoutService,
              private configService: ConfigService,
              private navigationService: NavigationService,
              private authService: AuthService) { }

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.isLogged = true;
    }
  }

  openSearch() {
    this.layoutService.openSearch();
  }
}
