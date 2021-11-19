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
      route: "/perfil-productor/mis-productos/",
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
    private authService: AuthService
  ) {

  }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
  }

  close() {
    this.popoverRef.close();
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(["iniciar-sesion"]);
    });
  }
}
