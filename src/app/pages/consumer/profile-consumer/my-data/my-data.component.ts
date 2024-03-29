import { Component, OnInit } from '@angular/core';

import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';

import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/service/users/users.service';
import { User } from 'src/app/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

import icPermIdentity from "@iconify/icons-ic/twotone-perm-identity";
import icWeb from "@iconify/icons-ic/twotone-web";
import icMail from "@iconify/icons-ic/twotone-mail";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPlace from "@iconify/icons-ic/twotone-place";
import icEdit from "@iconify/icons-ic/twotone-edit";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class MyDataComponent implements OnInit {

  public idUser: string;

  public user: User;

  public urlFile: File;

  public imageUrl: string;

  percent: Observable<number>;

  icPermIdentity = icPermIdentity;
  icWeb = icWeb;
  icMail = icMail;
  icPhone = icPhone;
  icPlace = icPlace;
  icEdit = icEdit;

  loading: boolean = false;

  constructor( 
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UsersService,
    private snackbar: MatSnackBar,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.loading = true;
    const { id } = this.route.snapshot.params;
    this.idUser = id;
    this.onGetUserInfo();
  }

  updateUserProfile(user: User) {
    this.dialog.open(UpdateProfileComponent, {
      data: user
    }).afterClosed().subscribe(updateUserProfile => {
      if (updateUserProfile) {
        this.snackbar.open("Su información de usuario ha sido actualizada satisfatoriamente", 'OK', {
          duration: 3000
        });
      }
    });
  }

  onGetUserInfo() {
    this.userService.getUserInfo(this.idUser).subscribe((data) => {
      this.user = data;
      this.loading = false;
    });
  }

  showPreviewImage(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.urlFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      
    }
    reader.readAsDataURL(file);

    this.userService.updatePhoto(this.idUser, this.urlFile);
 
    this.percent = this.userService.uploadPercentage;

  }

  updateProfileUrl() {
    this.user.profileURL = this.userService.urlProfileImage;
    this.authService.updatePhotoUrl(this.user.profileURL).then(() => {
      this.userService.updateUserDocument(this.user);
    });
  }
}
