import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { OrdersComponent } from './orders.component';


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    ScrollbarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
