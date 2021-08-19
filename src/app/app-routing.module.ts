import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { SPCRoutingModule } from './pages/spc/spc.routing';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes),
    AuthRoutingModule,
    SPCRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
