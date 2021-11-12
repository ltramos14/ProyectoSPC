import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-profile-producer',
  templateUrl: './profile-producer.component.html',
  animations: [
    stagger60ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProfileProducerComponent implements OnInit {

  public user: any;
  
  links: Link[] = [
    {
      label: 'ACTUALIZAR PERFIL',
      route: './actualizar-perfil',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'MEDIOS DE PAGO',
      route: './mis-medios-de-pago'
    },
  ];

  constructor( private authService: AuthService ) { }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    
  }

}
