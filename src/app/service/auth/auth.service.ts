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

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          resolve(userCredential.user);
        }, err => reject(err));
    })
  }

  async verificationEmail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
      .then(res => {

      })
      .catch(erro => {
        console.log(erro);
        
      })
  }

  register(user: User, password: string) {
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
          this.verificationEmail();
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
