import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { PqrMailbox } from 'src/app/models/pqr.model';
import { convertTimestampsPipe } from 'convert-firebase-timestamp';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  private pqrsCollection: AngularFirestoreCollection<PqrMailbox>;

  private pqrDoc: AngularFirestoreDocument<PqrMailbox>;

  private pqrs: Observable<PqrMailbox[]>;
  private pqr: Observable<PqrMailbox>;


  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.pqrsCollection = afs.collection<PqrMailbox>('pqrMailbox');
  }

  getPqrsRequests() {
    this.pqrs = this.pqrsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as PqrMailbox)),
      convertTimestampsPipe()
    );
    return this.pqrs;
  }

  getPqrsByUser(idUser: string): Observable<PqrMailbox[]> {
    return this.afs.collection('pqrMailbox', ref => ref.where('idUser', '==', idUser)).valueChanges() as Observable<PqrMailbox[]>;
  }

  getPqrInformation(pqrId: string) {
    this.pqrDoc = this.afs.doc<PqrMailbox>(`pqrMailbox/${pqrId}`);
    this.pqr = this.pqrDoc.valueChanges();
    return this.pqr;
  }

}
