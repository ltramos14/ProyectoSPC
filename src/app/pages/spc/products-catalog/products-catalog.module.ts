import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { ProductsCatalogComponent } from './products-catalog.component';


@NgModule({
  declarations: [ProductsCatalogComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ContainerModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
  ]
})
export class ProductsCatalogModule { }
