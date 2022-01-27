import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { ProductsCatalogComponent } from './products-catalog.component';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatDividerModule } from '@angular/material/divider';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [ProductsCatalogComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule,
    ContainerModule,
  ]
})
export class ProductsCatalogModule { }
