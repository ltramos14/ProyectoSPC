import {
  Component,
  OnInit,
} from "@angular/core";
import { MenuItem } from "../interfaces/menu-item.interface";
import { trackById } from "../../../../../../../@vex/utils/track-by";
import icSettings from "@iconify/icons-ic/twotone-settings";
import icAccountCircle from "@iconify/icons-ic/twotone-account-circle";
import icDns from "@iconify/icons-ic/twotone-dns";
import icChevronRight from "@iconify/icons-ic/twotone-chevron-right";
import icLock from "@iconify/icons-ic/twotone-lock";
import { PopoverRef } from "../../../../../../../@vex/components/popover/popover-ref";
import { AuthService } from "src/app/service/auth/auth.service";
import { Router } from "@angular/router";
import { UsersService } from "src/app/service/users/users.service";

@Component({
  selector: "app-toolbar-user-dropdown",
  templateUrl: "./toolbar-user-dropdown.component.html",
  styleUrls: ["./toolbar-user-dropdown.component.scss"],
})
export class ToolbarUserDropdownComponent implements OnInit {

  public user: any;

  trackById = trackById;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icLock = icLock;

  items: MenuItem[] = [
    {
      id: "1",
      icon: icAccountCircle,
      label: "Perfil de usuario",
      description: "Información y opciones de usuario",
      colorClass: "text-teal",
      route: "",
    },
    {
      id: "2",
      icon: icDns,
      label: "Mis pedidos",
      description: "Estado y detalles de tus pedidos",
      colorClass: "text-primary",
      route: "/",
    },
  ];

  constructor(
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
    private router: Router,
    private authService: AuthService,
    private userService: UsersService
  ) {

  }

  async ngOnInit() {
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
    });
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(["iniciar-sesion"]);
    });
  }

}
