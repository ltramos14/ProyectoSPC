import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, CarouselHomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatRippleModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    IconModule
  ]
})
export class HomeModule { }
