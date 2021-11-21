import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Farm } from 'src/app/models/farm.model';
import { municipalities } from 'src/static/municipalities-data';
import { MatSnackBar } from '@angular/material/snack-bar';

import icSpa from '@iconify/icons-ic/twotone-spa';
import icPlace from '@iconify/icons-ic/twotone-place';
import icDescription from '@iconify/icons-ic/twotone-description';
import icClose from '@iconify/icons-ic/twotone-close';


@Component({
  selector: 'app-my-farms-create-update',
  templateUrl: './my-farms-create-update.component.html'
})
export class MyFarmsCreateUpdateComponent implements OnInit {

  formFarms: FormGroup;
  mode: 'create' | 'update' = 'create';

  imageDefault: string = '../../../../../assets/images/LogoSPCv1.png';

  icSpa = icSpa;
  icPlace = icPlace;
  icDescription = icDescription;
  icClose = icClose;

  municipalities = municipalities;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<MyFarmsCreateUpdateComponent>,) {
  }

  ngOnInit() {

    if (this.defaults) {
      this.mode = 'update';
    } else  {
      this.mode = 'create';
      this.defaults = {} as Farm;
    }

    this.formFarms = this.fb.group({
      id: [this.defaults.id || ''],
      name: [
        this.defaults.name || '',
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ],
      municipality: [
        this.defaults.municipality || municipalities,
        Validators.required
      ],
      location: [
        this.defaults.location || '',
        Validators.required
      ],
      description: [
        this.defaults.description || '',
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
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


   // this.dialogRef.close(payment);

  }

  updateFarm() {

    this.dialogRef.close(this.defaults);

  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
