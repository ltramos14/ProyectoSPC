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
import { MatOptionModule, MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";

import { IconModule } from "@visurel/iconify-angular";
import { CarouselModule } from "primeng/carousel";
import { ContainerModule } from "src/@vex/directives/container/container.module";
import { ScrollbarModule } from "src/@vex/components/scrollbar/scrollbar.module";

import { MessageDialogComponent } from "./message-dialog/message-dialog.component";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { IncrementerComponent } from "./incrementer/incrementer.component";
import { OrderComponent } from "./order/order.component";
import { OrdersTableMenuComponent } from './orders-table-menu/orders-table-menu.component';
import { OrdersTableDataComponent } from './orders-table-data/orders-table-data.component';
import { ProductCardComponent } from "./product-card/product-card.component";
import { PqrFormComponent } from './pqr-form/pqr-form.component';
import { PrqTableComponent } from './prq-table/prq-table.component';
import { PipesModule } from "../pipes/pipes.module";
import { SearchComponent } from "./search/search.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { ViewDetailDialogComponent } from "./view-detail-dialog/view-detail-dialog.component";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    GoogleMapsComponent,
    IncrementerComponent,
    MessageDialogComponent,
    OrderComponent,
    OrdersTableDataComponent,
    OrdersTableMenuComponent,
    ProductCardComponent,
    PqrFormComponent,
    SearchComponent,
    SpinnerComponent,
    ViewDetailDialogComponent,
    PrqTableComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
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
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
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
    GoogleMapsComponent,
    IncrementerComponent,
    MessageDialogComponent,
    OrderComponent,
    OrdersTableDataComponent,
    OrdersTableMenuComponent,
    ProductCardComponent,
    PqrFormComponent,
    PrqTableComponent,
    SearchComponent,
    SpinnerComponent,
    ViewDetailDialogComponent,
  ],
})
export class ComponentsModule { }
