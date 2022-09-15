import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { DashboardComponent } from "./dashboard.component";

const routes: VexRoutes = [
  {
    path: "",
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class DashboardRoutingModule {}
