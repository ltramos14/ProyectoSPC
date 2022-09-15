import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { UsersComponent } from "./users.component";

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "all",
  },
  {
    path: "",
    component: UsersComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class UsersRoutingModule {}
