import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsModule } from './about-us/about-us.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductsModule } from './products/products.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UsersModule } from './users/users.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { SpcComponent } from './spc.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SpcComponent],
  imports: [
    CommonModule,
    AboutUsModule,
    ContactUsModule,
    HomeModule,
    ProductDetailModule,
    ProductsModule,
    ShoppingCartModule,
    UsersModule,
    ToolbarModule,
    RouterModule
  ]
})
export class SpcModule { }
