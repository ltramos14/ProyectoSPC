import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    IconModule,
    RouterModule,
  ]
})
export class MyOrdersModule { }
