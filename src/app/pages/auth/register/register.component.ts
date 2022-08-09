import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { OwnValidations } from 'src/app/service/helpers/ownValidations';
import { municipalities } from 'src/static/municipalities-data';

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
import icPlace from '@iconify/icons-ic/twotone-place'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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

  usertypesPrefixOptions = ['Productor', 'Transportador', 'Consumidor'];
  idTypesPrefixOptions = ['Cédula de ciudadanía', 'Tarjeta de identidad', 'Cédula de extranjería', 'Pasaporte', 'NIT']

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
  icPlace = icPlace;

  passwordInputType = 'password';

  municipalities = municipalities;


  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {
  }

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
      dateBirth: ['', [
        Validators.required,
        OwnValidations.validAge
      ]],
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
      ]],
      municipality: [municipalities, Validators.required],
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

  async submit(): Promise<void> {

    const password = this.generalDataFormGroup.get('password').value;

    const user: User = {
      ...this.typeUserFormGroup.value,
      ...this.especificDataFormGroup.value,
      ...this.generalDataFormGroup.value,
      profileURL: 'https://firebasestorage.googleapis.com/v0/b/bdproyectospc.appspot.com/o/Profile%20Image%2Fuseravatar.png?alt=media&token=4324a567-afd6-4ec2-9f74-068962639f7d',
      stateUser: true,
      notificationsToken: []
    }

    this.authService.register(user, password)
    .then(res => {
      this.snackbar.open(`Revisa tu correo: ${user.email}, allí te hemos enviamos un mensaje de verificación de cuenta.`, 'OK', {
        duration: 5000
      });
      this.router.navigate(['/verificacion-cuenta']);
    }).catch(error => {
      this.snackbar.open('¡Oops! Ocurrió un error al crear la cuenta en SPC.', 'OK', {
        duration: 5000
      });
    });

  }
}
