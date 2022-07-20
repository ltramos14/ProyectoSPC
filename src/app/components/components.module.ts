import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewDetailDialogComponent } from './view-detail-dialog/view-detail-dialog.component';
import { OrderComponent } from './order/order.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { SearchComponent } from './search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    GoogleMapsComponent,
    IncrementerComponent,
    OrderComponent,
    ProductCardComponent,
    SearchComponent,
    ViewDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    GoogleMapsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatRippleModule,
    MatTooltipModule,
    MatIconModule,
    MatOptionModule,

    IconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    DeleteDialogComponent,
    GoogleMapsComponent,
    IncrementerComponent,
    OrderComponent,
    ProductCardComponent,
    SearchComponent,
    ViewDetailDialogComponent,
  ]
})
export class ComponentsModule { }
