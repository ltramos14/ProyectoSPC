import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileGuard } from 'src/app/guards/profile.guard';
import { ConsumerComponent } from './consumer.component';
import { MyDataComponent } from './profile-consumer/my-data/my-data.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileConsumerComponent } from './profile-consumer/profile-consumer.component';
import { PqrMailboxcoComponent } from './pqr-mailboxco/pqr-mailboxco.component';

const routes: Routes = [
    {
        path: 'perfil-consumidor', component: ConsumerComponent, children: [
            {
                path: 'mis-datos', component: ProfileConsumerComponent, children: [
                    { path: 'informacion-perfil/:id', component: MyDataComponent, data: { title: 'Mis datos' } },
                ]
            },
            { path: 'mis-pedidos/:id', component: MyOrdersComponent, data: { title: 'Mis pedidos' } },
            { path: 'buzon-pqr/:id', component: PqrMailboxcoComponent, data: { title: 'Buzón PQR' } },
            { path: '', redirectTo: '/informacion-perfil/:id', pathMatch: 'full' },
        ], canActivate: [AuthGuard, ProfileGuard], canLoad: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsumerRouting { }
