import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataComponent } from './my-data.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MyDataComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatButtonModule
  ]
})
export class MyDataModule { }
