import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierComponent } from './carrier.component';
import { RouterModule } from '@angular/router';

import { MyOrdersModule } from '../consumer/my-orders/my-orders.module';
import { MyVehicleModule } from './my-vehicle/my-vehicle.module';
import { ProfileCarrierModule } from './profile-carrier/profile-carrier.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { CarrierRouting } from './carrier.routing';
import { PqrMailboxcaModule } from './pqr-mailboxca/pqr-mailboxca.module';

@NgModule({
  declarations: [CarrierComponent],
  imports: [
    CarrierRouting,
    CommonModule,
    MyOrdersModule,
    MyVehicleModule,
    ProfileCarrierModule,
    PqrMailboxcaModule,
    RouterModule,
    ToolbarModule,
  ]
})
export class CarrierModule { }
