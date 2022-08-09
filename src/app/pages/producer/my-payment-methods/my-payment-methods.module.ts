import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CreateUpdatePaymentMethodModule } from './create-update-payment-method/create-update-payment-method.module';
import { MyPaymentMethodsComponent } from './my-payment-methods.component';

@NgModule({
  declarations: [
    MyPaymentMethodsComponent
  ],
  imports: [
    CreateUpdatePaymentMethodModule,
    CommonModule,
    ComponentsModule,
    ContainerModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class MyPaymentMethodsModule { }
