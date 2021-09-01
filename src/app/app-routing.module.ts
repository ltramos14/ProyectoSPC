import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { AuthRoutingModule } from './pages/auth/auth.routing';
import { SPCRoutingModule } from './pages/spc/spc.routing';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'dashboard', component: CustomLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  }),
    AuthRoutingModule,
    SPCRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
