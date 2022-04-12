import { Component, OnInit } from '@angular/core';

import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'spc-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class OrderRequestComponent implements OnInit {

  icDoneAll = icDoneAll;

  constructor() { }

  ngOnInit(): void {
  }

}
