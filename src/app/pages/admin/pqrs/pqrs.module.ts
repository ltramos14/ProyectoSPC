import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PqrsRoutingModule } from './pqrs-routing.module';
import { PqrsComponent } from './pqrs.component';
import { ReplyPqrModule } from './reply-pqr/reply-pqr.module';


@NgModule({
  declarations: [PqrsComponent],
  imports: [
  BreadcrumbsModule,
    CommonModule,
    ComponentsModule,
    ContainerModule,
    FlexLayoutModule,
    FormsModule,
    IconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    PageLayoutModule,
    PqrsRoutingModule,
    ReplyPqrModule,
    ReactiveFormsModule,
  ]
})
export class PqrsModule { }
