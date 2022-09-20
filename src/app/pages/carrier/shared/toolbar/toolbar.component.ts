import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth/auth.service";
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

import icMenu from "@iconify/icons-ic/twotone-menu";
import icClose from "@iconify/icons-ic/twotone-close";
import icAssignmentInd from "@iconify/icons-ic/twotone-assignment-ind";
import icCar from "@iconify/icons-ic/twotone-local-shipping";
import icMap from "@iconify/icons-ic/twotone-map";
import icMarkUnReadMailbox from "@iconify/icons-ic/twotone-markunread-mailbox";
import icPowerSettingsNew from "@iconify/icons-ic/power-settings-new";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  icMenu = icMenu;
  icClose = icClose;
  icAssignmentInd = icAssignmentInd;
  icCar = icCar;
  icMap = icMap;
  icMarkUnReadMailbox = icMarkUnReadMailbox;
  icPowerSettingsNew = icPowerSettingsNew;

  public user: any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthService,
    private observer: BreakpointObserver
  ) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();

  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(["iniciar-sesion"]);
    });
  }

}
