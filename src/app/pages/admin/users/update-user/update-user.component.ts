import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interface';
import { OwnValidations } from 'src/app/service/helpers/ownValidations';
import { municipalities } from 'src/static/municipalities-data';

import icCalendar from '@iconify/icons-ic/twotone-calendar-today';
import icClose from '@iconify/icons-ic/twotone-close';
import icEmail from '@iconify/icons-ic/twotone-email';
import icFeaturedVideo from '@iconify/icons-ic/twotone-featured-video';
import icPermIdentity from "@iconify/icons-ic/twotone-perm-identity";
import icWeb from "@iconify/icons-ic/twotone-web";
import icMail from "@iconify/icons-ic/twotone-mail";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPlace from "@iconify/icons-ic/twotone-place";
import icEdit from "@iconify/icons-ic/twotone-edit";


@Component({
  selector: 'spc-update-user',
  templateUrl: './update-user.component.html',
  styles: [
  ]
})
export class UpdateUserComponent implements OnInit {

  icCalendar = icCalendar;
  icClose = icClose;
  icEmail = icEmail;
  icFeaturedVideo = icFeaturedVideo;
  icPermIdentity = icPermIdentity;
  icWeb = icWeb;
  icMail = icMail;
  icPhone = icPhone;
  icPlace = icPlace;
  icEdit = icEdit;

  userForm: FormGroup;

  user: User;

  idTypesPrefixOptions = ['Cédula de ciudadanía', 'Tarjeta de identidad', 'Cédula de extranjería', 'Pasaporte', 'NIT']
  municipalities = municipalities;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: User,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.defaults.uid || ''],
      names: [this.defaults.names || '', [
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      lastnames: [this.defaults.lastnames || '', [
        Validators.minLength(3),
        Validators.maxLength(20),
      ]],
      email: [{value: this.defaults.email || '', disabled: true}],
      dateBirth: [this.defaults.dateBirth || '', [
        Validators.required,
        OwnValidations.validAge
      ]],
      identificationType: [ this.defaults.identificationType || this.idTypesPrefixOptions[5], [
        Validators.required
      ]],
      identification: [this.defaults.identification || '', Validators.required],
      phone: [this.defaults.phone || '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]],
      municipality: [this.defaults.municipality || municipalities, Validators.required],
    });
  }

  updateUser(): void {
    Object.keys(this.userForm.value).forEach(value => {
      if (Object.keys(this.defaults).filter(u => u === value)) {
        this.defaults[value] = this.userForm.get(value).value;
      }
    });
    
    this.dialogRef.close(this.defaults);
  }

}
