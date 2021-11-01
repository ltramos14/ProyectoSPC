import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import icMenu from "@iconify/icons-ic/twotone-menu";
import icAssignmentInd from "@iconify/icons-ic/twotone-assignment-ind";
import icSpa from "@iconify/icons-ic/twotone-spa";
import icPinDrop from "@iconify/icons-ic/twotone-pin-drop";
import icMarkUnReadMailbox from "@iconify/icons-ic/twotone-markunread-mailbox";
import icVoiceOverOff from "@iconify/icons-ic/round-voice-over-off";
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

  constructor() { }

  ngOnInit() {
  }

}
