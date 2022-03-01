import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IconModule } from '@visurel/iconify-angular';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';

import { MyRoutesComponent } from './my-routes.component';
import { MyRoutesCreateUpdateModule } from './my-routes-create-update/my-routes-create-update.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    MyRoutesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MyRoutesCreateUpdateModule,
    ScrollbarModule
  ]
})
export class MyRoutesModule { }
