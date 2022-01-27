import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

import icCart from '@iconify/icons-ic/twotone-add-shopping-cart';
import icBuyNow from '@iconify/icons-ic/twotone-monetization-on';

@Component({
  selector: 'vex-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [
    fadeInUp400ms,
  ],
})
export class ProductDetailComponent implements OnInit {

  icCart = icCart;
  icBuyNow = icBuyNow;

  constructor() { }

  ngOnInit(): void {
  }

}
