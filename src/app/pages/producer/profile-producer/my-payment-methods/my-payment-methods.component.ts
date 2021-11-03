import { Component, OnInit } from '@angular/core';
import icAttachMoney from "@iconify/icons-ic/twotone-attach-money";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icWeb from "@iconify/icons-ic/twotone-web";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";

@Component({
  selector: 'vex-my-payment-methods',
  templateUrl: './my-payment-methods.component.html',
  styleUrls: ['./my-payment-methods.component.scss']
})
export class MyPaymentMethodsComponent implements OnInit {

  icAttachMoney = icAttachMoney;
  icPhone = icPhone;
  icWeb = icWeb;
  icEdit = icEdit;
  icDelete = icDelete;

  constructor() { }

  ngOnInit(): void {
  }

}
