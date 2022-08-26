import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { IconModule } from '@visurel/iconify-angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ScrollbarModule } from './../../../../@vex/components/scrollbar/scrollbar.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CarouselModule,
    CommonModule,
    ComponentsModule,
    IconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    PipesModule,
    ScrollbarModule,
    RouterModule
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
