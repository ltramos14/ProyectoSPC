import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { ComponentsModule } from 'src/app/components/components.module';
import { CarouselModule } from 'primeng/carousel';
import { IconModule } from '@visurel/iconify-angular';
import { OrderDetailsComponent } from './order-details.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CarouselModule,
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    IconModule,
    PipesModule,
  ]
})
export class OrderDetailsModule { }
