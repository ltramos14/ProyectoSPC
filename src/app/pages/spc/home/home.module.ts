import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, CarouselHomeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    CarouselModule,
    ComponentsModule,
    FlexLayoutModule,
    RouterModule,
  ]
})
export class HomeModule { }
