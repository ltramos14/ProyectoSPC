import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IconModule } from '@visurel/iconify-angular';

import { MyDataComponent } from './my-data.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [MyDataComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ]
})
export class MyDataModule { }
