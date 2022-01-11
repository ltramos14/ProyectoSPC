import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-profile-carrier',
  templateUrl: './profile-carrier.component.html',
  animations: [
    stagger60ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProfileCarrierComponent implements OnInit {

  public user: any;

  links: Link[];

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();

    this.links = [
      {
        label: 'DATOS PERFIL USUARIO',
        route: `./informacion-perfil/${this.user.uid}`
      },
    ];
  }
}
