import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { Link } from '../../../../@vex/interfaces/link.interface';

@Component({
  selector: 'app-profile-consumer',
  templateUrl: './profile-consumer.component.html',
  animations: [
    stagger60ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProfileConsumerComponent implements OnInit {

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
