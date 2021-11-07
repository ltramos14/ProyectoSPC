import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { municipalities } from 'src/static/municipalities-data';

import icPermIdentity from "@iconify/icons-ic/twotone-perm-identity";
import icWeb from "@iconify/icons-ic/twotone-web";
import icMail from "@iconify/icons-ic/twotone-mail";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPlace from "@iconify/icons-ic/twotone-place";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icClose from '@iconify/icons-ic/twotone-close';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {

  formUpdateProfile: FormGroup;
  mode: 'update';

  docId: string;

  icPermIdentity = icPermIdentity;
  icWeb = icWeb;
  icMail = icMail;
  icPhone = icPhone;
  icPlace = icPlace;
  icEdit = icEdit;
  icClose = icClose;

  municipalities = municipalities;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<UpdateProfileComponent>,
              private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private userService: UsersService) {
  }

  ngOnInit() {
    this.mode = 'update';
    this.initFormData();
  }

  initFormData() {
    this.formUpdateProfile = this.fb.group({
      names: [this.defaults.names, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      lastnames: [this.defaults.lastnames, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      phone: [this.defaults.phone, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]],
      municipality: [
        this.defaults.municipality || municipalities,
        Validators.required
      ],
    });
  }

  saveChanges() {
    this.updateProfile();
  }
  
  updateProfile() {
    
    this.defaults.names = this.formUpdateProfile.get('names').value;
    this.defaults.lastnames = this.formUpdateProfile.get('lastnames').value;
    this.defaults.phone = this.formUpdateProfile.get('phone').value;
    this.defaults.municipality = this.formUpdateProfile.get('municipality').value;
    
    this.userService.updateUserDocument(this.defaults);
    this.dialogRef.close(this.defaults);
    this.snackbar.open("Su información de usuario ha sido actualizada satisfatoriamente", 'OK', {
      duration: 3000
    });

  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
