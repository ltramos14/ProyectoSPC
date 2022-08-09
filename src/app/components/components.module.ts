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
import { MatOptionModule, MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconModule } from "@visurel/iconify-angular";

import { AvailableCarriersComponent } from "./available-carriers/available-carriers.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { IncrementerComponent } from "./incrementer/incrementer.component";
import { OrderComponent } from "./order/order.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { SearchComponent } from "./search/search.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { ViewDetailDialogComponent } from "./view-detail-dialog/view-detail-dialog.component";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [
    AvailableCarriersComponent,
    DeleteDialogComponent,
    GoogleMapsComponent,
    IncrementerComponent,
    OrderComponent,
    ProductCardComponent,
    SearchComponent,
    SpinnerComponent,
    ViewDetailDialogComponent,
  ],
  imports: [
  CommonModule,
    FormsModule,
    FlexLayoutModule,
    IconModule,
    GoogleMapsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatOptionModule,
    MatRippleModule,
    MatSelectModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AvailableCarriersComponent,
    DeleteDialogComponent,
    GoogleMapsComponent,
    IncrementerComponent,
    OrderComponent,
    ProductCardComponent,
    SearchComponent,
    SpinnerComponent,
    ViewDetailDialogComponent,
  ],
})
export class ComponentsModule { }
