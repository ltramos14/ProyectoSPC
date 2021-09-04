import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stagger80ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import icDescription from '@iconify/icons-ic/twotone-description';
import icVerticalSplit from '@iconify/icons-ic/twotone-vertical-split';
import icVisiblity from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icPerson from '@iconify/icons-ic/twotone-person';
import icEmail from '@iconify/icons-ic/twotone-email';
import icCalendar from '@iconify/icons-ic/twotone-date-range';
import icLock from '@iconify/icons-ic/twotone-lock';
import icFeaturedVideo from '@iconify/icons-ic/twotone-featured-video';
import icPhone from '@iconify/icons-ic/twotone-phone';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    stagger80ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class RegisterComponent implements OnInit {

  typeUserFormGroup: FormGroup;
  generalDataFormGroup: FormGroup;
  especificDataFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  phonePrefixOptions = ['+57'];

  usertypesPrefixOptions = ['Productor', 'Transportador', 'Consumidor'];
  idTypesPrefixOptions = ['Cédula de cuidadanía', 'Tarjeta de identidad', 'Cédula de extrajería', 'Pasaporte', 'NIT']

  icDoneAll = icDoneAll;
  icDescription = icDescription;
  icVerticalSplit = icVerticalSplit;
  icVisibility = icVisiblity;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  icPerson = icPerson;
  icEmail = icEmail;
  icCalendar = icCalendar;
  icLock = icLock;
  icPhone = icPhone;
  icFeaturedVideo = icFeaturedVideo;

  passwordInputType = 'password';

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.typeUserFormGroup = this.fb.group({
      typeuser: [this.usertypesPrefixOptions[3], Validators.required]
    });

    this.generalDataFormGroup = this.fb.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      dateBirth: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.especificDataFormGroup = this.fb.group({
      identificationType: [this.idTypesPrefixOptions[5], Validators.required],
      identification: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]]
    });

    this.confirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue]
    });
  }

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {

    console.log(this.typeUserFormGroup.value);
    console.log(this.generalDataFormGroup.value);
    console.log(this.especificDataFormGroup.value);
    
    
    this.snackbar.open('Hooray! You successfully created your account.', null, {
      duration: 5000
    });
  }
}
