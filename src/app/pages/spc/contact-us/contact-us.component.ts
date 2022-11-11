import { Component, OnInit } from '@angular/core';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class ContactUsComponent implements OnInit {

  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;

  constructor() { }

  ngOnInit(): void {
  }

}
