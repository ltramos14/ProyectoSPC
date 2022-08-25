import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { FlexLayoutModule } from "@angular/flex-layout";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatOptionModule, MatRippleModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconModule } from "@visurel/iconify-angular";
import { ContainerModule } from "src/@vex/directives/container/container.module";
import { ScrollbarModule } from "src/@vex/components/scrollbar/scrollbar.module";

import { AvailableCarriersComponent } from "./available-carriers/available-carriers.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { IncrementerComponent } from "./incrementer/incrementer.component";
import { OrderComponent } from "./order/order.component";
import { OrdersTableMenuComponent } from './orders-table-menu/orders-table-menu.component';
import { ProductCardComponent } from "./product-card/product-card.component";
import { SearchComponent } from "./search/search.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { ViewDetailDialogComponent } from "./view-detail-dialog/view-detail-dialog.component";
import { PipesModule } from "../pipes/pipes.module";
import { OrdersTableDataComponent } from './orders-table-data/orders-table-data.component';

@NgModule({
  declarations: [
    AvailableCarriersComponent,
    DeleteDialogComponent,
    GoogleMapsComponent,
    IncrementerComponent,
    OrderComponent,
    OrdersTableDataComponent,
    OrdersTableMenuComponent,
    ProductCardComponent,
    SearchComponent,
    SpinnerComponent,
    ViewDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    ContainerModule,
    FormsModule,
    FlexLayoutModule,
    IconModule,
    GoogleMapsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollbarModule,
  ],
  exports: [
    AvailableCarriersComponent,
    DeleteDialogComponent,
    GoogleMapsComponent,
    IncrementerComponent,
    OrderComponent,
    OrdersTableDataComponent,
    OrdersTableMenuComponent,
    ProductCardComponent,
    SearchComponent,
    SpinnerComponent,
    ViewDetailDialogComponent,
  ],
})
export class ComponentsModule { }
