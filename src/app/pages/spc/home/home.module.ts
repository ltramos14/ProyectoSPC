import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

import { ComponentsModule } from 'src/app/components/components.module';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, CarouselHomeComponent],
  imports: [
    CarouselModule,
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    RouterModule,
  ]
})
export class HomeModule { }
