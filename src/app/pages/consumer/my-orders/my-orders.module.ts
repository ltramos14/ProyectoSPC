import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    RouterModule,
  ]
})
export class MyOrdersModule { }
