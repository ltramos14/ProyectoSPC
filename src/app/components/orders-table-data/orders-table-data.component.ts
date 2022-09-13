import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { mergeMap, take } from "rxjs/operators";
import { AvailableCarriersComponent } from "src/app/pages/spc/orders/available-carriers/available-carriers.component";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";
import { NotificationsService } from "src/app/service/messaging/notifications.service";
import { OrderService } from "src/app/service/users/order.service";
import { Order } from "src/app/models/order.model";

import icCancel from "@iconify/icons-ic/twotone-cancel";
import icCheck from "@iconify/icons-ic/twotone-check-circle";
import icDeleteForever from "@iconify/icons-ic/twotone-delete-forever";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icSend from "@iconify/icons-ic/twotone-send";
import icWhereToVote from "@iconify/icons-ic/twotone-where-to-vote";
import { Tariff } from "src/app/interfaces/tariff.interface";

@Component({
  selector: "spc-orders-table-data",
  templateUrl: "./orders-table-data.component.html",
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class OrdersTableDataComponent<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() data: T[];
  @Input() columns: TableColumn<T>[];
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [10, 20, 50];
  @Input() searchStr: string;
  @Input() userType: string;
  @Input() userMunicipality: string;

  @Output() openOrderDetail = new EventEmitter<Order["id"]>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  visibleColumns: Array<keyof T | string>;
  dataSource = new MatTableDataSource<T>();

  icCancel = icCancel;
  icCheck = icCheck;
  icDeleteForever = icDeleteForever;
  icMoreVert = icMoreVert;
  icSend = icSend;
  icWhereToVote = icWhereToVote;

  today = new Date();

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private orderService: OrderService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.visibleColumns = this.columns.map((column) => column.property);
    }

    if (changes.data) {
      this.dataSource.data = this.data;
    }

    if (changes.searchStr) {
      this.dataSource.filter = (this.searchStr || "").trim().toLowerCase();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  confirmStatusChangeDialog(
    message: string,
    orderId: string,
    statusToChange: string
  ) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        message,
        confirmButton: { text: "Sí, cambiar estado", color: "accent" },
        cancelButton: { text: "Cancelar", color: "warn" },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onChangeOrderStatus(orderId, statusToChange);
      }
    });
  }

  onChangeOrderStatus(id: string, newStatus: string): void {
    if (newStatus === "Pagado") {
      this.onConfirmOrderPayment(id);
    } else {
      let newOrderData: any = {};
      this.orderService.getOrderById(id).pipe(take(1)).subscribe(
        (order) => {
          order.status = newStatus;
          newOrderData = order;
          this.orderService.saveOrder(newOrderData).then(() => {
            switch (newStatus) {
              case "Pagado":
                this.notificationService.notifyPaidOrder(order).subscribe();
                this.snackbar.open(`Se ha cambiado el estado del pedido # ${newOrderData.id.slice(0,8)}
                  a ${newStatus.toUpperCase()}`, "OK", { duration: 1000 });
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
                break;
              case "En camino":
                this.onConfirmOrderOnTheWay(order);
                break;
              case "Entregado":
                break;
              default:
                break;
            }
          });
        },
        () => {
          this.snackbar.open('Ocurrió un error al momento de cambiar el estado del pedido', "OK", { duration: 1000 });
        }
      );
    }
  }

  onConfirmOrderPayment(id: string) {
    let newOrder: any = {};
    this.orderService
      .getOrderById(id)
      .pipe(
        take(1),
        mergeMap((order: Order) => {
          const dialogRef = this.dialog.open(AvailableCarriersComponent, {
            maxWidth: "100vw",
            maxHeight: "100vh",
            width: "70%",
          });
          order.status = "Pagado";
          delete order["paymentLimitDate"];
          newOrder = order;
          return dialogRef.afterClosed();
        })
      )
      .subscribe((carrierId) => {
        if (carrierId) {
          newOrder.idCarrier = carrierId;
          this.orderService.saveOrder(newOrder).then(() => {
            this.notificationService.notifyPaidOrder(newOrder).subscribe();
            this.snackbar.open(
              `Se ha cambiado el estado del pedido # ${newOrder.id.slice(
                0,
                8
              )} a PEDIENTE DE PAGO`,
              "OK",
              { duration: 1000 }
            );
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }, () => {
        this.snackbar.open('Ocurrió un error al validar el pago del pedido', "OK", { duration: 1000 });
      });
  }

  onConfirmOrderOnTheWay(order: Order) {
    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer();

    directionService.route({
      origin: this.userMunicipality,
      destination: `${order.address.address}, ${order.address.municipality}`,
      travelMode: google.maps.TravelMode.DRIVING
    }, res => {
      console.log(res);
      directionRender.setDirections(res);
      const values: Tariff = {
        distance: res.routes[0].legs[0].distance.text,
        idOrder: order.id
      }
      
      this.orderService.calculateOrderTariff(values)
        .pipe(
          take(1),
          mergeMap((res) => {
              return this.notificationService.notifyOrderOnTheWay(order)
          })
        ).subscribe(res => {
          if (res) {
            this.snackbar.open(`Se ha cambiado el estado del pedido # ${order.id.slice(0,8)}
              a ${order.status.toUpperCase()}`, "OK", { duration: 1000 });
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
      
    })
  }


}
