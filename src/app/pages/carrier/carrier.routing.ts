import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileGuard } from 'src/app/guards/profile.guard';
import { CarrierComponent } from './carrier.component';
import { MyDataComponent } from './profile-carrier/my-data/my-data.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { MyVehicleComponent } from './my-vehicle/my-vehicle.component';
import { ProfileCarrierComponent } from './profile-carrier/profile-carrier.component';

const routes: Routes = [
    {
        path: 'perfil-transportador', component: CarrierComponent, children: [
            {
                path: 'mis-datos', component: ProfileCarrierComponent, children: [
                    { path: 'informacion-perfil/:id', component: MyDataComponent, data: { title: 'Mis datos' } },
                ]
            },
            { path: 'mi-vehiculo/:id', component: MyVehicleComponent, data: { title: 'Mis vehículos' } },
            { path: 'mis-rutas/:id', component: MyRoutesComponent, data: { title: 'Mis rutas' } },
            { path: '', redirectTo: '/informacion-perfil/:id', pathMatch: 'full' },
        ], canActivate: [AuthGuard, ProfileGuard], canLoad: [ AuthGuard ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarrierRouting { }
