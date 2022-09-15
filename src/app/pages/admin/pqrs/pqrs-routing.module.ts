import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';

import { PqrsComponent } from './pqrs.component';

const routes: VexRoutes = [
    {
      path: '',
      component: PqrsComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
  })
  export class PqrsRoutingModule {
  }
  