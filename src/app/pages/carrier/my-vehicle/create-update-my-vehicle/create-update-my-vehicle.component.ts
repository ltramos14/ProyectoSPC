import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from 'src/app/service/carrier/vehicles.service';

import icClose from '@iconify/icons-ic/twotone-close';
import icCar from "@iconify/icons-ic/twotone-local-shipping";
import faCapacity from '@iconify/icons-fa-solid/balance-scale-right';
import icLetter from "@iconify/icons-ic/twotone-fiber-dvr";
import icNumber from "@iconify/icons-ic/twotone-money";

@Component({
  selector: 'spc-create-update-my-vehicle',
  templateUrl: './create-update-my-vehicle.component.html',
})
export class CreateUpdateMyVehicleComponent implements OnInit {

  icClose = icClose;
  icCar = icCar;
  faCapacity = faCapacity;
  icLetter = icLetter;
  icNumber = icNumber;

  /**
   * 
   */
  mode: 'create' | 'update' = 'create';

  /**
   * 
   */
  VehicleTypeOptions = ['Camión sencillo', 'Camión refrigerado', 'Furgón', 'Camioneta'];

  /**
   * 
   */
  formVehicle: FormGroup;

  /**
   * 
   */
  vehicles: Vehicle[];

  /**
   * 
   */
  vehicle: Vehicle;

  /**
   *  
   */
  imageUrl: string;

  /**
   * 
   */
  imageDefault: string = './assets/illustrations/no-product.png';

  /**
   * 
   */
  urlFile: File;

  /** 
   * 
  */
  value = 0;


  /**
   * 
   * @param defaults 
   * @param fb 
   * @param snackbar 
   * @param dialogRef 
   * @param authService 
   * @param vehicleService 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUpdateMyVehicleComponent>,
    private authService: AuthService,
    private vehicleService: VehiclesService
  ) { }

  ngOnInit(): void {

    this.getCarrierDoc();

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
      this.defaults = {} as Vehicle;
    }

    this.formVehicle = this.fb.group({
      id: [this.defaults.id || ''],
      vehicleType: [
        this.defaults.vehicleType || '',
        Validators.required
      ],
      licensePlate: [this.defaults.licensePlate || '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(7),
        Validators.pattern('^[a-z-A-Z]{3}-[0-9]{3}$'),
      ]],
      maxCapacity: [this.defaults.maxCapacity || '', [
        Validators.required,
        Validators.min(30),
      ]],
      characteristics: [this.defaults.characteristics || '', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(200),
      ]],
      image: [this.defaults.image || '']
    });
  }

  async getCarrierDoc() {
    const { uid } = await this.authService.getCurrentUser();
    this.vehicleService.getCarrierDoc(uid);
    if (this.getData() !== undefined) {
      this.getData().subscribe(vehicle => this.vehicles = vehicle);
    }
  }

  getData() {
    return this.vehicleService.vehicle;
  }

  saveChanges() {
    if (this.mode === 'create') {
      this.saveVehicle();
    } else if (this.mode === 'update') {
      this.updateInfoVehicle();
    }
  }

  convertToVehicle(): Vehicle {
    let vehicle = new Vehicle();

    vehicle.id = this.formVehicle.get('id').value;
    vehicle.vehicleType = this.formVehicle.get('vehicleType').value;
    vehicle.licensePlate = this.formVehicle.get('licensePlate').value;
    vehicle.maxCapacity = this.formVehicle.get('maxCapacity').value;
    vehicle.characteristics = this.formVehicle.get('characteristics').value;
    vehicle.image = this.formVehicle.get('image').value;

    return vehicle;
  }
  
  saveVehicle() {
    let vehicleToCreate = this.convertToVehicle();
    this.vehicleService.uploadVehicleImage(null, vehicleToCreate, this.urlFile);
    this.dialogRef.close(this.vehicle);
  }

  updateInfoVehicle() {
    let vehicleToUpdate = this.convertToVehicle();
    this.vehicleService.uploadVehicleImage(this.defaults.id, vehicleToUpdate, this.urlFile);
    this.dialogRef.close(this.vehicle);
  }

  showPreviewImage(event: Event) {
    for (let i = 0; i <= 100; i++) {
      this.value = i;
    }

    const file = (event.target as HTMLInputElement).files[0];
    this.urlFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
