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
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
  CommonModule,
    ComponentsModule,
    IconModule,
    CarouselModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    ScrollbarModule,
    RouterModule
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
