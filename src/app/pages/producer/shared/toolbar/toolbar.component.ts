import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth/auth.service";
import icMenu from "@iconify/icons-ic/twotone-menu";
import icAssignmentInd from "@iconify/icons-ic/twotone-assignment-ind";
import icSpa from "@iconify/icons-ic/twotone-spa";
import icPinDrop from "@iconify/icons-ic/twotone-pin-drop";
import icMarkUnReadMailbox from "@iconify/icons-ic/twotone-markunread-mailbox";
import icPowerSettingsNew from "@iconify/icons-ic/power-settings-new";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {

  icMenu = icMenu;
  icAssignmentInd = icAssignmentInd;
  icSpa = icSpa;
  icPinDrop = icPinDrop;
  icMarkUnReadMailbox = icMarkUnReadMailbox;
  icPowerSettingsNew = icPowerSettingsNew;
  
  toggleClass: boolean = true;

  public user: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {   
    this.user = await this.authService.getCurrentUser();
   
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(["iniciar-sesion"]);
    });
  }
}
