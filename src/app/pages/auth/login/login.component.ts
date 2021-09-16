import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icEmail from '@iconify/icons-ic/twotone-email';
import icLock from '@iconify/icons-ic/twotone-lock';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';

import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icEmail = icEmail;
  icLock = icLock;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [localStorage.getItem('spc-email') || '', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onLogin() {

    const { email, password } = this.form.value;

    this.authService.login(email, password)
      .then((rest) => {
        if (this.form.get('remember').value) {
          localStorage.setItem('spc-email', this.form.get('email').value);
        } else {
          localStorage.removeItem('spc-email');
        }
        this.router.navigate(['/']);
        this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'LOL THANKS', {
          duration: 1000
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
}
