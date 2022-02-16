import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoService } from 'src/app/service/auth/crypto.service';
import { AuthService } from '../../../service/auth/auth.service';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';

import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icEmail from '@iconify/icons-ic/twotone-email';
import icLock from '@iconify/icons-ic/twotone-lock';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icEmail = icEmail;
  icLock = icLock;

  form: FormGroup;

  private password: string;

  inputType = 'password';

  visible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {
    this.isLocalStoragePassword();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [localStorage.getItem('spc-email') || '', [
        Validators.required,
        Validators.email
      ]],
      password: [this.password || '', Validators.required],
      remember: [Boolean(localStorage.getItem('isRemember')) || false]
    });
  }

  onLogin() {
    const { email, password } = this.form.value;

    this.authService.login(email, password)
      .then((rest) => {
        if (rest && rest.emailVerified) {
          if (this.form.get('remember').value) {
            localStorage.setItem('spc-email', this.form.get('email').value);
            this.cryptoService.encryptUsingAES256(this.form.get('password').value);
            localStorage.setItem('isRemember', this.form.get('remember').value);
          } else {
            localStorage.removeItem('spc-email');
          }
          this.snackbar.open(`¡Bienvenido ${rest.displayName}! 🥑`, 'OK', {
            duration: 2000
          });
          this.router.navigate(['/']);
        } else {
          this.snackbar.open('Lo sentimos, ¡La cuenta aún no ha sido verificada!', 'OK', {
            duration: 2000
          });
        }

      })
      .catch((error) => {
        let message;
        if (error.code.includes('user-not-found')) {
          message = '¡Usuario no encontrado!';
        } else if (error.code.includes('wrong-password')) {
          message = `¡Contraseña incorrecta!`;
        } else if (error.code.includes('too-many-requests')) {
          message = `Cuenta suspendida temporalmente por acceso a esta cuenta de forma excesiva ❌`;
        } 
        this.snackbar.open(message + ' 🚫', 'Cancelar', {
          duration: 3000
        });
      })
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  isLocalStoragePassword() {
    if (!localStorage.getItem('SPC-pass')) {
      this.password = '';
    } else {
      this.password = this.cryptoService.decryptUsingAES256();
    }
  }
}
