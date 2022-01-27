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
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    IncrementerComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatRippleModule,
    MatTooltipModule,
    MatIconModule,
    IconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    IncrementerComponent,
    ProductCardComponent
  ]
})
export class ComponentsModule { }
