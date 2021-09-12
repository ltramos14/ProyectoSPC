import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Observable<User[]>;

  private usersCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users')
  }
  
  async onSaveUserInformation(user: User, uid: string) {
    await this.usersCollection.doc(uid).set(user)
  }
}