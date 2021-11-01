import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    SidebarModule,
    RouterModule
   
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
