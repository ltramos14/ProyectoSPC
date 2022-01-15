import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartComponent } from './shopping-cart.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ComponentsModule
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
