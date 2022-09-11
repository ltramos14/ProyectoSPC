import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { ConsumerComponent } from "./consumer.component";
import { MyOrdersModule } from './my-orders/my-orders.module';
import { ProfileConsumerModule } from './profile-consumer/profile-consumer.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { ConsumerRouting } from "./consumer.routing";
import { PqrMailboxcoModule } from "./pqr-mailboxco/pqr-mailboxco.module";

@NgModule({
  declarations: [
    ConsumerComponent
  ],
  imports: [
    CommonModule,
    ConsumerRouting,
    MyOrdersModule,
    ProfileConsumerModule,
    PqrMailboxcoModule,
    RouterModule,
    ToolbarModule,
  ]
})
export class ConsumerModule { }
