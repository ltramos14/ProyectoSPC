import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPaymentMethodsComponent } from './my-payment-methods.component';
import { CreateUpdatePaymentMethodModule } from './create-update-payment-method/create-update-payment-method.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    MyPaymentMethodsComponent
  ],
  imports: [
    CreateUpdatePaymentMethodModule,
    CommonModule,
    ContainerModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class MyPaymentMethodsModule { }
