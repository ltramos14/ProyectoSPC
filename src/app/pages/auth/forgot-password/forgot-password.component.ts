import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]]
  });

  icMail = icMail;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  send() {
    const email = this.form.get('email').value;
    this.authService.resetPassword(email).then(() => {
      this.snackbar.open(`Verifica tu correo ${ email } para cambiar la contraseña de tu cuenta en SPC`, 'OK', {
        duration: 2000
      });
      this.router.navigate(['/iniciar-sesion']);
    })
  }

}
