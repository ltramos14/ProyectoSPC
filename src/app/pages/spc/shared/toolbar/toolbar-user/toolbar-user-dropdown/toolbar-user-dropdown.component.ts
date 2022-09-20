import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MenuItem } from "../interfaces/menu-item.interface";
import { AuthService } from "src/app/service/auth/auth.service";
import { UsersService } from "src/app/service/users/users.service";
import { PopoverRef } from "../../../../../../../@vex/components/popover/popover-ref";
import { trackById } from "../../../../../../../@vex/utils/track-by";

import icAccountCircle from "@iconify/icons-ic/twotone-account-circle";
import icChevronRight from "@iconify/icons-ic/twotone-chevron-right";

@Component({
  selector: "app-toolbar-user-dropdown",
  templateUrl: "./toolbar-user-dropdown.component.html",
  styleUrls: ["./toolbar-user-dropdown.component.scss"],
})
export class ToolbarUserDropdownComponent implements OnInit {

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

  public user: any;

  typeUser: string;

  loading: boolean = false;

  isVerifiedPerson: boolean = false;
  
  trackById = trackById;
  icChevronRight = icChevronRight;

  constructor(
    private authService: AuthService,
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
    private router: Router,
    private userService: UsersService
  ) { }

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
      const { typeuser, isVerifiedPerson } = data;

      this.isVerifiedPerson = isVerifiedPerson;
      this.typeUser = typeuser;

      let routeProfile;

      switch(typeuser) {
        case 'Administrador':
          routeProfile = "/administrador/dashboard"
          break;
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
          console.error("No hay una ruta de perfil especificada");
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
