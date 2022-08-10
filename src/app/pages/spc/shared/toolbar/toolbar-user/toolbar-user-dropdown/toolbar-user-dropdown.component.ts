import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { PopoverRef } from "../../../../../../../@vex/components/popover/popover-ref";
import { trackById } from "../../../../../../../@vex/utils/track-by";

import icAccountCircle from "@iconify/icons-ic/twotone-account-circle";
import icChevronRight from "@iconify/icons-ic/twotone-chevron-right";

import { MenuItem } from "../interfaces/menu-item.interface";
import { AuthService } from "src/app/service/auth/auth.service";
import { UsersService } from "src/app/service/users/users.service";

@Component({
  selector: "app-toolbar-user-dropdown",
  templateUrl: "./toolbar-user-dropdown.component.html",
  styleUrls: ["./toolbar-user-dropdown.component.scss"],
})
export class ToolbarUserDropdownComponent implements OnInit {

  public user: any;

  trackById = trackById;
  icChevronRight = icChevronRight;

  items: MenuItem[] = [
    {
      id: "1",
      icon: icAccountCircle,
      label: "Perfil de usuario",
      description: "Información y opciones de usuario",
      colorClass: "text-teal",
      route: "",
    }
  ];

  loading: boolean = false;

  constructor(
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
    private router: Router,
    private authService: AuthService,
    private userService: UsersService
  ) {

  }

  async ngOnInit() {
    this.loading = true;
    this.user = await this.authService.getCurrentUser();
    this.profileUrl();
  }

  close() {
    this.popoverRef.close();
  }

  profileUrl() {
    this.userService.getUserInfo(this.user.uid).subscribe(data => {
      const { typeuser } = data;
      let routeProfile;

      switch(typeuser) {
        case 'Productor':
          routeProfile = "/perfil-productor/mis-datos/informacion-perfil"
          break;
        case 'Consumidor':
          routeProfile = "/perfil-consumidor/mis-datos/informacion-perfil"
          break;
        case 'Transportador':
          routeProfile = "/perfil-transportador/mis-datos/informacion-perfil"
          break;
        default:
          console.error("No hay una ruta de perfil especficada");
      }
      this.items[0].route = routeProfile;
      this.loading = false;
    });
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(["iniciar-sesion"]);
    });
  }

}
