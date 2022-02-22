import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUpdateMyVehicleComponent } from './create-update-my-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { IconModule } from '@visurel/iconify-angular';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [CreateUpdateMyVehicleComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  entryComponents: [CreateUpdateMyVehicleComponent],
  exports: [CreateUpdateMyVehicleComponent]
})
export class CreateUpdateMyVehicleModule { }
