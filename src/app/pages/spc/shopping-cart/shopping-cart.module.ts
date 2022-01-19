import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { ComponentsModule } from 'src/app/components/components.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ScrollbarModule } from './../../../../@vex/components/scrollbar/scrollbar.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
  CommonModule,
    ComponentsModule,
    IconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    ScrollbarModule
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
