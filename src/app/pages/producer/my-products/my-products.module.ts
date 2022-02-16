import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { MyProductsComponent } from './my-products.component';
import { ProductsService } from 'src/app/service/producer/products.service';
import { ProductsCreateUpdateModule } from './products-create-update/products-create-update.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [MyProductsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ContainerModule,
    FlexLayoutModule,
    FormsModule,
    IconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    PageLayoutModule,
    ProductsCreateUpdateModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService]
})
export class MyProductsModule { }
