import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'app-profile-producer',
  templateUrl: './profile-producer.component.html',
  styleUrls: ['./profile-producer.component.css'],
  animations: [
    stagger60ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProfileProducerComponent implements OnInit {

  links: Link[] = [
    {
      label: 'DATOS DEL PERFIL',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'MEDIOS DE PAGO',
      route: './mis-medios-de-pago'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
