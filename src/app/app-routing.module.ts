import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: '',
    loadChildren: () => import('./pages/carrier/carrier.module').then(m => m.CarrierModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/consumer/consumer.module').then(m => m.ConsumerModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/producer/producer.module').then(m => m.ProducerModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/spc/spc.module').then(m => m.SpcModule)
  },
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'administrador', 
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
