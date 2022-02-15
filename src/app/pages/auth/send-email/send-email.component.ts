import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [AuthService],
  animations: [
    stagger80ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SendEmailComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    // Se valida de que si el usuario no está logeado o ya verificó la cuenta no permita ves esta página
    const user = await this.authSvc.getCurrentUser();
    if (!user || user.emailVerified) {
      this.router.navigate(['/'])
    }
  }

  async onSendEmail() {
    // Se envía el correo para verificar la cuenta
    await this.authSvc.verificationEmail();
  }

}
