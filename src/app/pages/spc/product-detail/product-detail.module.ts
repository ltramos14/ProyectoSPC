import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './product-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CarouselModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
  ],
  exports: [
    ProductDetailComponent
  ]
})
export class ProductDetailModule { }
