import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/service/auth/auth.service';
import { CreateUpdateMyVehicleComponent } from './create-update-my-vehicle/create-update-my-vehicle.component';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from 'src/app/service/carrier/vehicles.service';

import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

import icCar from "@iconify/icons-ic/twotone-local-shipping";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";

@Component({
  selector: 'app-my-vehicle',
  templateUrl: './my-vehicle.component.html',
  animations: [
    fadeInUp400ms,
    stagger40ms,
    fadeInRight400ms
  ],
})
export class MyVehicleComponent implements OnInit {

  icCar = icCar;
  icEdit = icEdit;
  icDelete = icDelete;

  /**
   * 
   */
  vehicle: Vehicle[];

  /**
 * 
 */
  imageDefault: string = './assets/illustrations/vehicle.png';

  loading: boolean = false;

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
    this.loading = true;
    const { uid } = await this.authService.getCurrentUser();
    this.vehicleService.getCarrierDoc(uid);
    if (this.getData() !== undefined) {
      this.getData().subscribe(vehicle => {
        this.vehicle = vehicle;
        this.loading = false;
      });
    }
  }

  getData() {
    return this.vehicleService.vehicle;
  }

  createVehicle() {
    this.dialog.open(CreateUpdateMyVehicleComponent);
  }

  
  updateVehicle(vehicle: Vehicle) {
    this.dialog.open(CreateUpdateMyVehicleComponent, {
      data: vehicle
    });
  }

  confirmDeleteDialog(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        message: `¿Estás seguro de que deseas eliminar de tu perfil el vehículo de placa "${vehicle.licensePlate}" ?`,
        buttonText: {
          ok: "Sí, eliminar",
          cancel: "Cancelar"
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteVehicle(vehicle);
      }
    })
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
}
