import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerComponent } from './producer.component';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { MyFarmsModule } from './my-farms/my-farms.module';
import { MyProductsModule } from './my-products/my-products.module';
import { ProfileProducerModule } from './profile-producer/profile-producer.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProducerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    MyFarmsModule,
    MyProductsModule,
    ProfileProducerModule,
  ]
})
export class ProducerModule { }
