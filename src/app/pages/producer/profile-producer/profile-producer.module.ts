import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { ProfileProducerComponent } from './profile-producer.component';
import { RouterModule } from '@angular/router';
import { MyDataModule } from './my-data/my-data.module';
import { MyPaymentMethodsModule } from './my-payment-methods/my-payment-methods.module';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ 
    ProfileProducerComponent, 
  ],
  imports: [
    CommonModule,
    MatIconModule,
    IconModule,
    RouterModule,
    MyDataModule,
    MyPaymentMethodsModule,
    MatRippleModule,
    MatTabsModule
  ]
})
export class ProfileProducerModule { }
