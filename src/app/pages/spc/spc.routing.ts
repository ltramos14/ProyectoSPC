import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UsersComponent } from './users/users.component';
import { SpcComponent } from './spc.component';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';

const routes: Routes = [
    { path: 'inicio', component: SpcComponent, children: [
        { path: '', component: HomeComponent , data: { title: 'Inicio' } },
        { path: 'quienes-somos', component: AboutUsComponent , data: { title: '¿Quiénes somos?' } },
        { path: 'contactanos', component: ContactUsComponent, data: { title: 'Contáctanos' }},
        { path: 'productos', component: ProductsCatalogComponent, data: { title: 'Productos agrícolas' } },
        { path: 'detalles-producto', component: ProductDetailComponent },
        { path: 'carrito', component: ShoppingCartComponent , data: { title: 'Carrito de compras' } },
        { path: 'usuarios', component: UsersComponent },
    ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SPCRoutingModule {}