import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UsersComponent } from './users/users.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    UsersComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ShoppingCartComponent
  ]
})
export class SpcModule { }
