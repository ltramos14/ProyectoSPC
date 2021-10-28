import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../../interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afFirestore: AngularFirestore,
    public usersService: UsersService,
    public router: Router
  ) { }

  async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password)
          .then(
            response => {
              this.afAuth.idToken.subscribe(token => {
                localStorage.setItem('access-token', token);
              })
            }
          )
  }

/*   // Send email verfificaiton when new user sign up
  verificationMail() {
    return this.afAuth.currentUser.
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  } */

  register(user: User, password: string) {
    const userAuth = this.afAuth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(user.email, password)
        .then(async (res) => {
  
          (await this.afAuth.currentUser).updateProfile({
            displayName: user.names + ' ' + user.lastnames,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/bdproyectospc.appspot.com/o/Profile%20Image%2Fuseravatar.png?alt=media&token=4324a567-afd6-4ec2-9f74-068962639f7d"
          })

          await this.usersService.onSaveUserInformation(user, res.user.uid);
  
          this.logout();

          resolve(res);
          
        }, err => reject(err));

    });

  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('access-token');
    } catch(error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
