import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';

import { AuthRoutingModule } from './pages/auth/auth.routing';
import { SPCRoutingModule } from './pages/spc/spc.routing';
import { ProducerRouting } from './pages/producer/producer.routing';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'dashboard', component: CustomLayoutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  }),
    AuthRoutingModule,
    SPCRoutingModule,
    ProducerRouting
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
