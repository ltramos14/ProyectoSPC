import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

import {User} from '../../interfaces/user.interface';
import { Route } from '../../models/routes.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  routesCollection: AngularFirestoreCollection<Route>;

  routes: Observable<Route[]>;

  carrierDoc: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore) { }

  getCarrierDoc(uid: string) {
    this.carrierDoc = this.afs.doc<User>(`users/${ uid }`);
    this.routesCollection = this.carrierDoc.collection<Route>('routes');
    this.getRoutes();
  }

  getRoutes() {
    this.routes = this.routesCollection.snapshotChanges()
        .pipe(map((actions) => actions.map((a) => a.payload.doc.data() as Route)));
  }

  saveRoute(idRoute: string, route: Route): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = idRoute|| this.afs.createId();
        const data = { id, ...route };
        const result = await this.routesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteRoute(idRoute: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.routesCollection
            .doc(idRoute)
            .delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
