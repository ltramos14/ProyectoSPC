import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/service/users/users.service';

import icClose from '@iconify/icons-ic/twotone-close';
import icPerson from '@iconify/icons-ic/twotone-person';
import icRole from '@iconify/icons-ic/twotone-desktop-windows';
import { PqrMailbox } from 'src/app/models/pqr.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'spc-reply-pqr',
  templateUrl: './reply-pqr.component.html',
})
export class ReplyPqrComponent implements OnInit {

  formReplyPqr: FormGroup;

  user: User;

  icClose = icClose;
  icPerson = icPerson;
  icRole = icRole;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: PqrMailbox,
    private dialogRef: MatDialogRef<ReplyPqrComponent>,
    private fb: FormBuilder,
    private userService: UsersService,
    private snackbar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.defaults.answer === 'Pendiente') {
      this.formReplyPqr = this.fb.group({
        answer: ['',
          [
            Validators.required,
            Validators.minLength(30),
            Validators.maxLength(250),
          ]
        ]
      });

    } else {
      this.formReplyPqr = this.fb.group({
        answer: [this.defaults.answer],
      });
    }

    this.userService.getUserInfo(this.defaults.idUser).subscribe(data => {
      this.user = data;
    })
  }

  responseRequest() {
    this.defaults.answer = this.formReplyPqr.get('answer').value;
    this.userService.savePqrUser(this.defaults.id, this.defaults).then(() => {
      this.snackbar.open('La respuesta a la solicitud se ha almacenado y enviado satisfactoriamente', 'OK', {
        duration: 3000
      });
    })
    this.dialogRef.close(this.defaults);
  }

}
