import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { ProductsCatalogComponent } from './products-catalog.component';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [ProductsCatalogComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    ContainerModule,
  ]
})
export class ProductsCatalogModule { }
