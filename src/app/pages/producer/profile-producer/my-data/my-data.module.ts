import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataComponent } from './my-data.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';



@NgModule({
  declarations: [
    MyDataComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    IconModule
  ]
})
export class MyDataModule { }
