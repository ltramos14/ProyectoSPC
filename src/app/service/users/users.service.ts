import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from 'src/app/interfaces/user.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { PqrMailbox } from 'src/app/models/pqr.model';
import { convertTimestampsPipe } from 'convert-firebase-timestamp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection;

  private userDoc: AngularFirestoreDocument<User>;

  private user: Observable<User>;

  private pqrsCollection: AngularFirestoreCollection<PqrMailbox>;

  private pqrDoc: AngularFirestoreDocument<PqrMailbox>;

  private pqr: Observable<PqrMailbox>;

  public uploadPercentage: Observable<number>;

  public urlProductImage: Observable<string>;

  public urlProfileImage: string;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.usersCollection = afs.collection<User>('users');
    this.pqrsCollection = afs.collection<PqrMailbox>('pqrMailbox');
  }

  async onSaveUserInformation(user: User, uid: string) {
    const data = { uid, ...user }
    await this.usersCollection.doc(uid).set(data)
  }

  getUserInfo(userId: string) {
    this.userDoc = this.afs.doc<User>(`users/${userId}`);
    this.user = this.userDoc.valueChanges();
    return this.user;
  }

  getUsersByType(typeUser: string): Observable<User[]> {
    let type = null;

    if (typeUser === 'productores' || typeUser === 'Productor') {
      type = 'Productor';
    } else if (typeUser === 'transportadores' || typeUser === 'Transportador') {
      type = 'Transportador';
    }
    return this.afs.collection('users', ref => ref.where('typeuser', '==', type)).valueChanges() as Observable<User[]>;
  }

  getUserToAdministrator(): Observable<User[]> {
    return this.afs.collection('users', ref => ref.where('typeuser', '!=', 'Administrador')).valueChanges().pipe(convertTimestampsPipe()) as Observable<User[]>;
  }

  updateUserDocument(user: User) {
    this.userDoc.update(user);
  }

  updatePhoto(uid: string, file: File) {
    const filePath = `Profile Image/${uid}`;

    const ref = this.storage.ref(filePath);
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
      .subscribe(async (userInfo) => {
        if (userInfo.notificationsToken !== newToken) {
          userInfo.notificationsToken = newToken;
          await this.onSaveUserInformation(userInfo, uid);
        }
      });
  }

  savePqrUser(idPqr: string, pqr: PqrMailbox): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = idPqr || this.afs.createId();
        const data = { id, ...pqr };
        const result = await this.pqrsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

}
