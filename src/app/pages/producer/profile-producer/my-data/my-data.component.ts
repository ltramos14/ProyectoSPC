import { Component, OnInit } from '@angular/core';
import icPermIdentity from "@iconify/icons-ic/twotone-perm-identity";
import icWeb from "@iconify/icons-ic/twotone-web";
import icMail from "@iconify/icons-ic/twotone-mail";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPlace from "@iconify/icons-ic/twotone-place";
import icEdit from "@iconify/icons-ic/twotone-edit";

import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/service/users/users.service';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'vex-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class MyDataComponent implements OnInit {

  public idUser: string;

  user: User;

  icPermIdentity = icPermIdentity;
  icWeb = icWeb;
  icMail = icMail;
  icPhone = icPhone;
  icPlace = icPlace;
  icEdit = icEdit;

  constructor( 
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UsersService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.idUser = data.id;
    });

    this.onGetUserInfo();
  }

  updateUserProfile(user: User) {
    this.dialog.open(UpdateProfileComponent, {
      data: user
    }).afterClosed().subscribe(updateUserProfile => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updateUserProfile) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        
      }
    });
  }

  onGetUserInfo() {
    this.userService.getUserInfo(this.idUser).subscribe((data) => {
      this.user = data;
    });
  }
}
