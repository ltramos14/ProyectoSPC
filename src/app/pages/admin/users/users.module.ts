import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UpdateUserModule } from './update-user/update-user.module';


@NgModule({
  declarations: [UsersComponent],
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
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    PageLayoutModule,
    ReactiveFormsModule,
    UpdateUserModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
