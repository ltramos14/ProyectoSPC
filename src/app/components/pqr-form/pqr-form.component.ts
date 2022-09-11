import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PqrMailbox } from 'src/app/models/pqr.model';
import { UsersService } from 'src/app/service/users/users.service';

import icContact from '@iconify/icons-ic/twotone-contact-support';
import icDescription from '@iconify/icons-ic/twotone-description';

@Component({
  selector: 'spc-pqr-form',
  templateUrl: './pqr-form.component.html'
})
export class PqrFormComponent implements OnInit {

  @Input('idUser') idUser: string;

  formPQR: FormGroup;

  pqrOptions = [
    "Petición",
    "Queja",
    "Reclamo",
    "Sugerencia",
  ];

  icContact = icContact;
  icDescription = icDescription;

  defaults: any;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.formPQR = this.fb.group({
      idUser: [this.idUser],
      date: [new Date()],
      type: ['', Validators.required],
      description: ['',
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(250),
        ],
      ],
      answer: ['Pendiente']
    });
  }

  sendPqrUser() {
    let pqr = new PqrMailbox();
    pqr = this.formPQR.value;
    this.userService.savePqrUser(null, pqr).then(() => {
      this.snackbar.open('Tu solicitud se ha radicado satisfactoriamente, no olvides tener en cuenta los tiempos de respuesta!', 'OK', {
        duration: 3000
      });
    })

    this.formPQR.reset();
  }

}
