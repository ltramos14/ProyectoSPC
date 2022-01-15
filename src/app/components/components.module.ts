import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IncrementerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    IconModule
  ],
  exports: [
    IncrementerComponent
  ]
})
export class ComponentsModule { }
