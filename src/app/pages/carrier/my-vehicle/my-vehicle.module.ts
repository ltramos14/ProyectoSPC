import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyVehicleComponent } from './my-vehicle.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { CreateUpdateMyVehicleModule } from './create-update-my-vehicle/create-update-my-vehicle.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [MyVehicleComponent],
  imports: [
    CommonModule,
    CreateUpdateMyVehicleModule,
    ComponentsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule,
    MatTooltipModule,
    MatIconModule,
    IconModule,
  ]
})
export class MyVehicleModule { }
