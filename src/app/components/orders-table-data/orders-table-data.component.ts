import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/users/order.service';

import icCancel from '@iconify/icons-ic/twotone-cancel';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icSend from '@iconify/icons-ic/twotone-send';
import icWhereToVote from '@iconify/icons-ic/twotone-where-to-vote';

@Component({
  selector: 'spc-orders-table-data',
  templateUrl: './orders-table-data.component.html',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ],
})
export class OrdersTableDataComponent<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() data: T[];
  @Input() columns: TableColumn<T>[];
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [10, 20, 50];
  @Input() searchStr: string;
  @Input() userType: string;

  @Output() openOrderDetail = new EventEmitter<Order['id']>();

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

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.visibleColumns = this.columns.map(column => column.property);
    }

    if (changes.data) {
      this.dataSource.data = this.data;
    }

    if (changes.searchStr) {
      this.dataSource.filter = (this.searchStr || '').trim().toLowerCase();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  confirmStatusChangeDialog(message: string, orderId: string, statusToChange: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        message,
        confirmButton: { text: 'Sí, cambiar estado', color: 'accent' },
        cancelButton: { text: 'Cancelar', color: 'warn' }
      }
    });
    dialogRef.afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        this.onChangeOrderStatus(orderId, statusToChange)
      }
    })
  }

  onChangeOrderStatus(id: string, newStatus: string): void {
    let newOrder: any = {}
    this.orderService.getOrderById(id)
      .subscribe(order => {
        order.status = newStatus;
        newOrder = order
      })
      
    setTimeout(() => {
      this.orderService.saveOrder(newOrder).then(() => {
        this.snackbar.open(`Se ha cambiado el estado del pedido # ${newOrder.id.slice(0, 8)} a ${newStatus.toLocaleUpperCase()}`,
          'OK', { duration: 1000 });
      });
    }, 1000)

    setTimeout(() => {
      window.location.reload();
    }, 3000)
  }

}
