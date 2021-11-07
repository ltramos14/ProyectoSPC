import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Observable<User[]>;

  private usersCollection: AngularFirestoreCollection;

  private userDoc: AngularFirestoreDocument<User>;

  private user: Observable<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users')
  }
  
  async onSaveUserInformation(user: User, uid: string) {
    await this.usersCollection.doc(uid).set(user)
  }

  getUserInfo(userId: string) {
    this.userDoc = this.afs.doc<User>(`users/${ userId }`);
    return this.user = this.userDoc.valueChanges();
  }
}