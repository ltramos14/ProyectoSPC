import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from 'src/app/interfaces/user.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Observable<User[]>;

  private usersCollection: AngularFirestoreCollection;

  private userDoc: AngularFirestoreDocument<User>;

  private user: Observable<User>;

  public uploadPercentage: Observable<number>;

  public urlProductImage: Observable<string>;

  public urlProfileImage: string;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.usersCollection = afs.collection<User>('users')
  }

  async onSaveUserInformation(user: User, uid: string) {
    const data = { uid, ...user }
    await this.usersCollection.doc(uid).set(data)
  }

  getUserInfo(userId: string) {
    this.userDoc = this.afs.doc<User>(`users/${ userId }`);
    this.user = this.userDoc.valueChanges();
    return this.user;
  }

  updateUserDocument(user: User) {
    this.userDoc.update(user);
  }

  updatePhoto(uid: string, file: File) {
    const filePath = `Profile Image/${uid}`;
    
    const ref =  this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);  

    this.uploadPercentage = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {
      ref.getDownloadURL().subscribe(urlImage => {
        this.urlProfileImage = urlImage
      });
    })).subscribe();
  }

  validateNotificationsToken(uid: string, newToken: string) {
    this.getUserInfo(uid)
      .subscribe( async (userInfo) => {        
        if (userInfo.notificationsToken !== newToken) {
          userInfo.notificationsToken = newToken;
          await this.onSaveUserInformation(userInfo, uid);
        }
      });
  }

}
