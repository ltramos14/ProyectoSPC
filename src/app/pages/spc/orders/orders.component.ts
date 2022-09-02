import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, delay, finalize, map, mergeMap, switchMap } from "rxjs/operators";
import { Order } from "src/app/models/order.model";
import { AuthService } from "src/app/service/auth/auth.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { OrderService } from "src/app/service/users/order.service";

import icSearch from "@iconify/icons-ic/twotone-search";
import icMenu from "@iconify/icons-ic/twotone-menu";
import { MatDialog } from "@angular/material/dialog";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { UsersService } from "src/app/service/users/users.service";
import { User } from "src/app/interfaces/user.interface";

export const aioTableLabels = [
  {
    text: "Pendiente de pago",
    textClass: "text-amber",
    bgClass: "bg-amber-light",
    previewClass: "bg-amber",
  },
  {
    text: "Pagado",
    textClass: "text-green",
    bgClass: "bg-green-light",
    previewClass: "bg-green",
  },
  {
    text: "Cancelado",
    textClass: "text-red",
    bgClass: "bg-red-light",
    previewClass: "bg-red",
  },
  {
    text: "En camino",
    textClass: "text-gray",
    bgClass: "bg-gray-light",
    previewClass: "bg-gray",
  },
  {
    text: "Entregado",
    textClass: "text-cyan",
    bgClass: "bg-cyan-light",
    previewClass: "bg-cyan",
  },
];

@Component({
  selector: "vex-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class OrdersComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  subscriptions: Subscription[] = [];

  searchCtrl = new FormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(debounceTime(10));

  menuOpen = false;

  activedCategory:
    | "all"
    | "Pendiente de pago"
    | "Pagado"
    | "Cancelado"
    | "En camino"
    | "Entregado";

  tableData: Order[];

  typeUser: string;

  icSearch = icSearch;
  icMenu = icMenu;

  tableColumns: TableColumn<Order>[] = [
    {
      label: "ID",
      property: "id",
      type: "text",
      cssClasses: ["font-medium", "uppercase"],
    },
    {
      label: "MEDIO DE PAGO",
      property: "chosenPayment",
      type: "text",
      cssClasses: ["text-secondary"],
    },
    {
      label: "DESTINO",
      property: "municipality",
      type: "text",
      cssClasses: ["text-secondary"],
    },
    {
      label: "TELÉFONO",
      property: "phone",
      type: "text",
      cssClasses: ["text-secondary"],
    },
    {
      label: "TOTAL",
      property: "total",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: "FECHA DEL PEDIDO",
      property: "orderDate",
      type: "text",
      cssClasses: ["text-secondary"],
    },
    {
      label: "ESTADO DEL PEDIDO",
      property: "status",
      type: "button",
    },
    {
      label: "",
      property: "menu",
      type: "button",
      cssClasses: ["text-secondary", "w-10"],
    },
  ];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private userService: UsersService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.loading = true;
    const { uid } = await this.authService.getCurrentUser();
    this.getData(uid);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getData(uid: string) {
    this.subscriptions.push(
      this.userService
        .getUserInfo(uid)
        .pipe(
          mergeMap((res: User) => {
            const filter = (res.typeuser === 'Productor') ? 'idProducer' : 'idCarrier';
            this.typeUser = res.typeuser;
            return this.orderService.getOrdersByUser(uid, filter);
          }),
        )
        .subscribe((data) => {
          const array: any = data.map((order) => {
            const found = aioTableLabels.find(
              (label) => label.text === order.status
            );
            return {
              id: order.id,
              chosenPayment: order.chosenPayment.name,
              municipality: order.address.municipality,
              phone: order.address.phone,
              total: `$ ${order.total}`,
              orderDate: order.orderDate.toDate().toLocaleDateString(),
              status: found,
              limitDate: order.paymentLimitDate.toDate() || ""
            };
          });
          this.tableData = array;
          this.loading = false;
        })
    );
  }

  openOrderDetails(id?: Order["id"]): void {
    this.dialog.open(OrderDetailsComponent, {
      data: { id, typeUser: this.typeUser },
      width: "700px",
    });
  }

  setData(data: Order[]) {
    this.tableData = data;
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }
}
