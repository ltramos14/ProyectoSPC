import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, mergeMapTo } from 'rxjs/operators';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../interfaces/user.interface';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: string;

  notificationToken: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afMessaging: AngularFireMessaging,
    public afFirestore: AngularFirestore,
    public usersService: UsersService,
    public router: Router
  ) {
    this.getNotificationsToken();
  }

  login(email: string, password: string): Promise<firebase.default.User> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            this.uid = userCredential.user.uid;
          if (!this.notificationToken) {
            this.requestPermissions();
          } else {
            this.usersService.validateNotificationsToken(userCredential.user.uid, this.notificationToken);
          }
          resolve(userCredential.user);
        }, err => reject(err));
    });
  }

  async verificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error(`Ocurrió el siguiente error: ${ error }`);
    }
  }

  register(user: User, password: string): Promise<any> {
    const userAuth = this.afAuth.currentUser;
    return new Promise<any>((resolve, reject) => {
      // Se mandan los datos de correo y contraseña a Authenticaction
      this.afAuth.createUserWithEmailAndPassword(user.email, password)
        .then(async (res) => {
          // Actualizar la información del displayName y photoUrl del usuario en Authenticaction
          (await this.afAuth.currentUser).updateProfile({
            displayName: user.names + ' ' + user.lastnames,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/bdproyectospc.appspot.com/o/Profile%20Image%2Fuseravatar.png?alt=media&token=4324a567-afd6-4ec2-9f74-068962639f7d"
          });
          // Se envía el resto de información un nuevo documento de la colección de 'users'
          await this.usersService.onSaveUserInformation(user, res.user.uid);
          // Se envía el correo de verificación de cuenta
          await this.verificationEmail();
          this.logout();
          resolve(res);
        }, err => reject(err));

    });

  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async updateDisplayName(name: string, lastname: string) {
    (await this.afAuth.currentUser).updateProfile({
      displayName: name + ' ' + lastname
    });
  }

  async updatePhotoUrl(photoURL: string) {
    (await this.afAuth.currentUser).updateProfile({
      photoURL
    });
  }

  private requestPermissions(): void {    
    this.afMessaging.requestPermission
    .pipe(mergeMapTo(this.afMessaging.tokenChanges))
    .subscribe(async (token) => { 
        this.usersService.validateNotificationsToken(this.uid, token);
       },
      (error) => { console.error(error); },  
    );
  }

  private getNotificationsToken(): void {
    this.afMessaging.getToken.subscribe(
      res => this.notificationToken = res
    );
  }

}
