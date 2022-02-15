import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Farm } from 'src/app/models/farm.model';
import { FarmsService } from 'src/app/service/producer/farms.service';
import { municipalities } from 'src/static/municipalities-data';

import icSpa from '@iconify/icons-ic/twotone-spa';
import icPlace from '@iconify/icons-ic/twotone-place';
import icDescription from '@iconify/icons-ic/twotone-description';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'app-my-farms-create-update',
  templateUrl: './my-farms-create-update.component.html'
})
export class MyFarmsCreateUpdateComponent implements OnInit {

  icSpa = icSpa;
  icPlace = icPlace;
  icDescription = icDescription;
  icClose = icClose;

  mode: 'create' | 'update' = 'create';

  formFarms: FormGroup;

  imageDefault: string = '../../../../../assets/images/logotipos/LogoSPCv1.png';

  apiLoaded: Observable<boolean>;

  municipalities = municipalities;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private farmService: FarmsService,
    private dialogRef: MatDialogRef<MyFarmsCreateUpdateComponent>,
    httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDovs02EzOw0Ldd4IjoOMzoNJ22ckUFI0Y', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
      this.defaults = {} as Farm;
    }

    this.formFarms = this.fb.group({
      id: [this.defaults.id || ''],
      name: [
        this.defaults.name || '', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]
      ],
      municipality: [
        this.defaults.municipality || municipalities,
        Validators.required
      ],
      location: [
        this.defaults.location || '', [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      description: [
        this.defaults.description || '', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ]
      ],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createFarm();
    } else if (this.mode === 'update') {
      this.updateFarm();
    }
  }

  createFarm() {
    let farm = new Farm();

    farm.name = this.formFarms.get("name").value;
    farm.municipality = this.formFarms.get("municipality").value;
    farm.description = this.formFarms.get("description").value;
    farm.location = this.formFarms.get("location").value;


    this.farmService.saveFarm(null, farm).then(() => {
      this.snackbar.open('Finca agregada satisfactoriamente', 'OK', {
        duration: 3000
      });
    })

    this.dialogRef.close();
  }

  updateFarm() {
    let farm = new Farm;

    farm.id = this.formFarms.get('id').value;
    farm.name = this.formFarms.get('name').value;
    farm.municipality = this.formFarms.get('municipality').value;
    farm.description = this.formFarms.get('description').value;
    farm.location = this.formFarms.get('location').value;


    this.farmService.saveFarm(farm.id, farm).then(() => {
      this.snackbar.open('Finca editada satisfactoriamente', 'OK', {
        duration: 3000
      });
    })

    this.dialogRef.close();
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
