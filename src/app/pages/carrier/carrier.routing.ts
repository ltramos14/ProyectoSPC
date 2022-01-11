import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CarrierComponent } from './carrier.component';
import { ProfileCarrierComponent } from './profile-carrier/profile-carrier.component';
import { MyDataComponent } from './profile-carrier/my-data/my-data.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { MyVehicleComponent } from './my-vehicle/my-vehicle.component';

const routes: Routes = [
    {
        path: 'perfil-transportador', component: CarrierComponent, children: [
            {
                path: 'mis-datos', component: ProfileCarrierComponent, children: [
                    { path: 'informacion-perfil/:id', component: MyDataComponent },
                ]
            },
            { path: 'mi-vehiculo/:id', component: MyVehicleComponent },
            { path: 'mis-rutas/:id', component: MyRoutesComponent },
            { path: '', redirectTo: '/informacion-perfil/:id', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarrierRouting { }
