import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
