import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsModule } from './about-us/about-us.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductsModule } from './products/products.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutUsModule,
    ContactUsModule,
    HomeModule,
    ProductDetailModule,
    ProductsModule,
    ShoppingCartModule,
    UsersModule,
    SharedModule
  ]
})
export class SpcModule { }
