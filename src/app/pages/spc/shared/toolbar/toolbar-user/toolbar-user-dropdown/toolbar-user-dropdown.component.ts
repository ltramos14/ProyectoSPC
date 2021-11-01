import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { Icon } from "@visurel/iconify-angular";
import { PopoverRef } from "../../../../../../../@vex/components/popover/popover-ref";
import { AuthService } from "src/app/service/auth/auth.service";
import { Router } from "@angular/router";

export interface OnlineStatus {
  label: string;
  icon: Icon;
  colorClass: string;
}

@Component({
  selector: "app-toolbar-user-dropdown",
  templateUrl: "./toolbar-user-dropdown.component.html",
  styleUrls: ["./toolbar-user-dropdown.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserDropdownComponent implements OnInit {

  public photoURL: string;
  public displayName: string;

  items: MenuItem[] = [
    {
      id: "1",
      icon: icAccountCircle,
      label: "Perfil de usuario",
      description: "Información Personal",
      colorClass: "text-teal",
      route: "/apps/social",
    },
    {
      id: "2",
      icon: icDns,
      label: "Mis pedidos",
      description: "Estado y detalles de tus pedidos",
      colorClass: "text-primary",
      route: "/apps/chat",
    },
  ];

  trackById = trackById;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icLock = icLock;

  constructor(
    private cd: ChangeDetectorRef,
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
    private router: Router,
    private authService: AuthService
  ) {

  }
  
  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    this.photoURL = user.photoURL;
    this.displayName = user.displayName;
  }

  close() {
    this.popoverRef.close();
  }

  onLogout() {
    this.authService.logout().then((resp) => {
      this.router.navigate(["iniciar-sesion"]);
    });
  }
}
