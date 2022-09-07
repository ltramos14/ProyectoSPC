import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';
import { CarouselModule } from 'primeng/carousel';

import { ComponentsModule } from 'src/app/components/components.module';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { OrdersComponent } from './orders.component';
import { AvailableCarriersComponent } from './available-carriers/available-carriers.component';

@NgModule({
  declarations: [
    OrdersComponent,
    AvailableCarriersComponent
  ],
  imports: [
    CarouselModule,
    CommonModule,
    ComponentsModule,
    IconModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatRadioModule,
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
