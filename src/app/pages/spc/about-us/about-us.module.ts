import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { IconModule } from '@visurel/iconify-angular';

import { AboutUsComponent } from './about-us.component';

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AboutUsModule { }
