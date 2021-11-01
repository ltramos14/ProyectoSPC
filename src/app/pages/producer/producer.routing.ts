import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProducerComponent } from './producer.component';
import { ProfileProducerComponent } from './profile-producer/profile-producer.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyFarmsComponent } from './my-farms/my-farms.component';

const routes: Routes = [
    { path: 'perfil-productor', component: ProducerComponent, children: [
        { path: 'mis-datos', component: ProfileProducerComponent},
        { path: 'mis-productos', component: MyProductsComponent },
        { path: 'mis-fincas', component: MyFarmsComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProducerRouting {}
