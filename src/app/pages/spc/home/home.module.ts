import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [HomeComponent, CarouselHomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ComponentsModule,
    CarouselModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule,
  ]
})
export class HomeModule { }
