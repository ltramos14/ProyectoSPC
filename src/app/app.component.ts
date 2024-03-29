import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import { Subscription } from 'rxjs';
import icDashboard from '@iconify/icons-ic/twotone-dashboard';
import icPeople from '@iconify/icons-ic/twotone-people';
import icMailbox from '@iconify/icons-ic/twotone-markunread-mailbox';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  public title: string = "Proyecto SPC";
  public titleSub$: Subscription;

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private router: Router,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

     this.configService.updateConfig({
      sidenav: {
        title: 'Administrador SPC',
        imageUrl: '../assets/images/logotipos/LogoSPCv1.png',
        showCollapsePin: false
      },
     
      });

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));

    this.titleSub$ = this.getParamsRoutes().subscribe(({ title }) => {
      this.title = title;
      document.title = `SPC - ${ this.title }`;
    })

    this.navigationService.items = [
      {
        type: 'link',
        label: 'Dashboard',
        route: '/administrador/dashboard',
        icon: icDashboard
      },
      {
        type: 'link',
        label: 'Usuarios',
        route: '/administrador/usuarios',
        icon: icPeople
      },
      {
        type: 'link',
        label: 'Buzón de PQRs',
        route: '/administrador/pqrs',
        icon: icMailbox
      }
    ];
  }

  getParamsRoutes() {
    return this.router.events
        .pipe(
          filter(event => event instanceof ActivationEnd),
          filter((event: ActivationEnd) => event.snapshot.firstChild === null),
          map((event: ActivationEnd) => event.snapshot.data)
        );
  }

}
