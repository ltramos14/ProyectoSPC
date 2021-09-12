import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../../interfaces/user.interface';
import { UsersService } from '../users/users.service';

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

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['home']);

      })
  }

/*   // Send email verfificaiton when new user sign up
  verificationMail() {
    return this.afAuth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  } */

  register(user: User, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(user.email, password)
        .then(async (res) => {
  
          await this.usersService.onSaveUserInformation(user, res.user.uid);
  
          resolve(res);
          
        }, err => reject(err));

    });

  }

  logout() {

  }

  getCurrentUser() {

  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afFirestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email, 
      names: user.names,
      lastnames: user.lastnames,
      dateBirth: user.dateBirth,
      typeuser: user.typeuser,
      identificationType: user.identificationType,
      identification: user.identification,
      phone: user.phone,
      profileURL: user.profileURL,
      stateUser: user.stateUser,
      verifyEmail: user.verifyEmail
    }
    return userRef.set(userData, {
      merge: true
    })
  }

}