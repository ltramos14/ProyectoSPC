import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProducerComponent } from './producer.component';
import { ProfileProducerComponent } from './profile-producer/profile-producer.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyFarmsComponent } from './my-farms/my-farms.component';
import { MyDataComponent } from './profile-producer/my-data/my-data.component';
import { MyPaymentMethodsComponent } from './my-payment-methods/my-payment-methods.component';

const routes: Routes = [
    { path: 'perfil-productor', component: ProducerComponent, children: [
        { path: 'mis-datos', component: ProfileProducerComponent, children: [
            { path: 'informacion-perfil/:id', component: MyDataComponent },
        ]},
        { path: 'mis-medios-de-pago', component: MyPaymentMethodsComponent },
        { path: 'mis-productos/:id', component: MyProductsComponent },
        { path: 'mis-fincas/:id', component: MyFarmsComponent },
        { path: '', redirectTo: '/informacion-perfil/:id', pathMatch: 'full' },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProducerRouting {}
