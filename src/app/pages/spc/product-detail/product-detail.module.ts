import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { CarouselModule } from 'primeng/carousel';

import { ComponentsModule } from 'src/app/components/components.module';
import { ProductDetailComponent } from './product-detail.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    ProductDetailComponent,
  ],
  imports: [
    CarouselModule,
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    PipesModule,
  ],
  exports: [
    ProductDetailComponent,
  ],
})
export class ProductDetailModule { }
