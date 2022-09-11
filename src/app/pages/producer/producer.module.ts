import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyFarmsModule } from './my-farms/my-farms.module';
import { MyProductsModule } from './my-products/my-products.module';
import { ProducerComponent } from './producer.component';
import { ProfileProducerModule } from './profile-producer/profile-producer.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { ProducerRouting } from './producer.routing';
import { PqrMailboxprModule } from './pqr-mailboxpr/pqr-mailboxpr.module';

@NgModule({
  declarations: [
    ProducerComponent,
  ],
  imports: [
    CommonModule,
    MyFarmsModule,
    MyProductsModule,
    PqrMailboxprModule,
    ProfileProducerModule,
    ProducerRouting,
    RouterModule,
    ToolbarModule,
  ]
})
export class ProducerModule { }
