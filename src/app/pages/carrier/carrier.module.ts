import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierComponent } from './carrier.component';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { ProfileCarrierModule } from './profile-carrier/profile-carrier.module';
import { MyOrdersModule } from '../consumer/my-orders/my-orders.module';
import { MyVehicleModule } from './my-vehicle/my-vehicle.module';

@NgModule({
  declarations: [CarrierComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ProfileCarrierModule,
    MyOrdersModule,
    MyVehicleModule
  ]
})
export class CarrierModule { }
