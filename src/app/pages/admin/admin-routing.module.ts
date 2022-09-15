import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileGuard } from 'src/app/guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    children: [ 
      {
        path: 'dashboard', 
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard' }
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: { title: 'Usuarios' }
      },
      {
        path: 'pqrs',
        loadChildren: () => import('./pqrs/pqrs.module').then(m => m.PqrsModule),
        data: { title: 'Lista PQRs' }
      },
    ],
    canActivate: [AuthGuard, ProfileGuard], canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class AdminRoutingModule { }
