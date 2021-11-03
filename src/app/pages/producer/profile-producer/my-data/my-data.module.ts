import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataComponent } from './my-data.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    MyDataComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule
  ]
})
export class MyDataModule { }
