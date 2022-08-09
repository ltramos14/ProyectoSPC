import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { IconModule } from '@visurel/iconify-angular';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from 'src/app/components/components.module';
import { MyOrdersComponent } from './my-orders.component';

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
  ]
})
export class MyOrdersModule { }
