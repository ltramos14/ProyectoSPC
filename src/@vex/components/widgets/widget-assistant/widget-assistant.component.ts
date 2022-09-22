import { Component, Input, OnInit } from '@angular/core';
import icCheckCircle from '@iconify/icons-ic/twotone-not-listed-location';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  @Input() usersToVerify: number;
  @Input() pqrsToResponse: number;

  icCheckCircle = icCheckCircle;

  constructor() { }

  ngOnInit() {
  }

}
