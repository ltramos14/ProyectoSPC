import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { Order } from "src/app/models/order.model";
import { OrderService } from "src/app/service/users/order.service";
import { User } from "src/app/interfaces/user.interface";
import { UsersService } from "src/app/service/users/users.service";

import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icPrint from "@iconify/icons-ic/twotone-print";
import icDownload from "@iconify/icons-ic/twotone-cloud-download";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icMyLocation from "@iconify/icons-ic/twotone-my-location";
import icLocationCity from "@iconify/icons-ic/twotone-location-city";
import icEditLocation from "@iconify/icons-ic/twotone-edit-location";

@Component({
  selector: "spc-order-details",
  templateUrl: "./order-details.component.html",
  styles: [],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  icMoreVert = icMoreVert;
  icClose = icClose;
  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;

  public order: Order;
  public consumerInfo: User;
  public carrierInfo: User;
  public producerInfo: User;
  public subscriptions: Subscription[] = [];
  public today = new Date();
  public loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(suscription => suscription.unsubscribe());
  }

  ngOnInit() {
    if (this.data?.id) this.getOrderById(this.data?.id);
  }

  getOrderById(orderId: string) {
    this.loading = true;
    this.orderService.getOrderById(orderId).subscribe((res) => {
      this.order = res;
      this.subscriptions.push(
        this.getUserInfo(res.idConsumer).subscribe(
          (data) => (this.consumerInfo = data)
        )
      );
      res.idConsumer &&
        this.data?.typeUser === "Productor" &&
        this.subscriptions.push(
          this.getUserInfo(res.idCarrier).subscribe(
            (data) => (this.carrierInfo = data)
          )
        );
      this.data?.typeUser === "Transportador" &&
        this.subscriptions.push(
          this.getUserInfo(res.idProducer).subscribe(
            (data) => (this.producerInfo = data)
          )
        );
      this.loading = false;
    });
  }

  getUserInfo(id: string) {
    return this.userService.getUserInfo(id);
  }
}
