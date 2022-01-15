import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';

import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HomeComponent, CarouselHomeComponent],
  imports: [
    CommonModule,
    CarouselModule,
    ToastModule,
    ButtonModule
  ]
})
export class HomeModule { }
