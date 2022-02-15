import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUpdateMyVehicleComponent } from './create-update-my-vehicle/create-update-my-vehicle.component';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from 'src/app/service/carrier/vehicles.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";

@Component({
  selector: 'app-my-vehicle',
  templateUrl: './my-vehicle.component.html',
  styleUrls: ['./my-vehicle.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms,
    fadeInRight400ms
  ],
})
export class MyVehicleComponent implements OnInit {

  icEdit = icEdit;
  icDelete = icDelete;

  /**
   * 
   */
  vehicle: Vehicle[];

  /**
   * 
   * @param vehicleService 
   * @param authService 
   * @param dialog 
   * @param snackbar 
   */
  constructor(
    private vehicleService: VehiclesService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  async ngOnInit() {
    const { uid } = await this.authService.getCurrentUser();
    this.vehicleService.getCarrierDoc(uid);
    if (this.getData() !== undefined) {
      this.getData().subscribe(vehicle => this.vehicle = vehicle);
    }
  }

  getData() {
    return this.vehicleService.vehicle;
  }

  createVehicle() {
    this.dialog.open(CreateUpdateMyVehicleComponent);
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle.id).then(() => {
      this.snackbar.open(`El vehículo de trabajo fue eliminado satisfactoriamente`, 'OK', {
        duration: 2000
      });
    }).catch(err => {
      this.snackbar.open(`Error: ${err.message}`, 'OK', {
        duration: 2000
      });
    })
  }

  updateVehicle(vehicle: Vehicle) {
    this.dialog.open(CreateUpdateMyVehicleComponent, {
      data: vehicle
    });
  }
}
