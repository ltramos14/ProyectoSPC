import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsumerComponent } from './consumer.component';
import { ProfileConsumerComponent } from './profile-consumer/profile-consumer.component';
import { MyDataComponent } from './profile-consumer/my-data/my-data.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
    {
        path: 'perfil-consumidor', component: ConsumerComponent, children: [
            {
                path: 'mis-datos', component: ProfileConsumerComponent, children: [
                    { path: 'informacion-perfil/:id', component: MyDataComponent },
                ]
            },
            { path: 'mis-pedidos/:id', component: MyOrdersComponent },
            { path: '', redirectTo: '/informacion-perfil/:id', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsumerRouting { }
