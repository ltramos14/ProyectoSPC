import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsModule } from './about-us/about-us.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UsersModule } from './users/users.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { SpcComponent } from './spc.component';
import { RouterModule } from '@angular/router';
import { ProductsCatalogModule } from './products-catalog/products-catalog.module';
import { FooterModule } from './shared/footer/footer.module';
import { OrdersModule } from './orders/orders.module';
import { OrderRequestModule } from './order-request/order-request.module';

@NgModule({
  declarations: [
    SpcComponent
  ],
  imports: [
    AboutUsModule,
    CommonModule,
    ContactUsModule,
    FooterModule,
    HomeModule,
    OrdersModule,
    OrderRequestModule,
    ProductsCatalogModule,
    ProductDetailModule,
    RouterModule,  
    ShoppingCartModule,
    ToolbarModule,
    UsersModule,
  ]
})
export class SpcModule { }
