import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProducerComponent } from './producer.component';
import { ProfileProducerComponent } from './profile-producer/profile-producer.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyFarmsComponent } from './my-farms/my-farms.component';
import { MyDataComponent } from './profile-producer/my-data/my-data.component';
import { MyPaymentMethodsComponent } from './my-payment-methods/my-payment-methods.component';
import { ProfileGuard } from 'src/app/guards/profile.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    { path: 'perfil-productor', component: ProducerComponent, children: [
        { path: 'mis-datos', component: ProfileProducerComponent, children: [
            { path: 'informacion-perfil/:id', component: MyDataComponent, data: { title: 'Mis datos' } },
        ] },
        { path: 'mis-medios-de-pago', component: MyPaymentMethodsComponent, data: { title: 'Mis medios de pago' } },
        { path: 'mis-productos/:id', component: MyProductsComponent, data: { title: 'Mis productos' } },
        { path: 'mis-fincas/:id', component: MyFarmsComponent, data: { title: 'Mis fincas' } },
        { path: '', redirectTo: '/informacion-perfil/:id', pathMatch: 'full' },
    ], canActivate: [ AuthGuard, ProfileGuard ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProducerRouting {}
