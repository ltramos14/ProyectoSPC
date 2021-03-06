import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/address.model';
import { municipalities } from 'src/static/municipalities-data';

import icClose from "@iconify/icons-ic/twotone-close";
import icMyLocation from "@iconify/icons-ic/twotone-my-location";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMap from "@iconify/icons-ic/twotone-map";
import icNoteAdd from "@iconify/icons-ic/twotone-note-add";

@Component({
  selector: 'spc-add-update-address',
  templateUrl: './add-update-address.component.html',
  styles: [
  ]
})
export class AddUpdateAddressComponent implements OnInit {

  formAddress: FormGroup;

  mode: 'create' | 'update' = 'create';

  icClose = icClose;
  icMyLocation = icMyLocation;
  icPhone = icPhone;
  icMap = icMap;
  icNoteAdd = icNoteAdd;

  municipalities = municipalities;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateAddressComponent>,
  ) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
      this.defaults = {} as Address;
    }

    this.formAddress = this.fb.group({
      id: [this.defaults.id || ''],
      address: [
        this.defaults.address || '',
        Validators.required
      ],
      municipality: [
        this.defaults.municipality || '',
        Validators.required
      ],
      phone: [
        this.defaults.phone || '',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*')
        ]
      ],
      addtionalInfo: [this.defaults.addtionalInfo || '']
    });

  }

   /**
   * Método que crea una nueva ruta para el transportador en sesión
   */
    createAddress() {
      let address = new Address();
      address = this.formAddress.value as Address;
      const { id, ...data } = address;
      this.dialogRef.close(data);
    }
  
    /**
     * Método que edita una ruta
     */
    updateAddress() {
      let address = new Address();
      address = this.formAddress.value as Address;
      this.dialogRef.close(address);
    }
  
    /**
   * Método que valida si se desea edicar o crear una nueva ruta
   */
    saveChanges() {
      if (this.mode === "create") {
        this.createAddress();
      } else if (this.mode === "update") {
        this.updateAddress();
      }
    }
  
    isCreateMode() {
      return this.mode === "create";
    }
  
    isUpdateMode() {
      return this.mode === "update";
    }

}
