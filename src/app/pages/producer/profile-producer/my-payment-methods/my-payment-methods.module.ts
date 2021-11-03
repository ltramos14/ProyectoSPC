import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPaymentMethodsComponent } from './my-payment-methods.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MyPaymentMethodsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class MyPaymentMethodsModule { }
