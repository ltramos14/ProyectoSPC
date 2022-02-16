import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateUpdatePaymentMethodModule } from './create-update-payment-method/create-update-payment-method.module';
import { MyPaymentMethodsComponent } from './my-payment-methods.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';

@NgModule({
  declarations: [
    MyPaymentMethodsComponent
  ],
  imports: [
    CreateUpdatePaymentMethodModule,
    CommonModule,
    ContainerModule,
    ComponentsModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class MyPaymentMethodsModule { }
