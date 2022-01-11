import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { ConsumerComponent } from "./consumer.component";
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { ProfileConsumerModule } from './profile-consumer/profile-consumer.module';
import { MyOrdersModule } from './my-orders/my-orders.module';

@NgModule({
  declarations: [
    ConsumerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ProfileConsumerModule,
    MyOrdersModule,
  ]
})
export class ConsumerModule { }
