import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { CreateUpdateMyVehicleModule } from './create-update-my-vehicle/create-update-my-vehicle.module';
import { MyVehicleComponent } from './my-vehicle.component';

@NgModule({
  declarations: [MyVehicleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    CreateUpdateMyVehicleModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
  ]
})
export class MyVehicleModule { }
