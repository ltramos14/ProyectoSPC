import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';
import { Address } from 'src/app/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  addressesCollection: AngularFirestoreCollection<Address>;

  addresses: Observable<Address[]>;

  consumerDoc: AngularFirestoreDocument<User>;

  uid: string;

  constructor(private afs: AngularFirestore) { }

  getConsumerDoc(uid: string) {
    this.consumerDoc = this.afs.doc<User>(`users/${ uid }`);
    this.addressesCollection = this.consumerDoc.collection<Address>('addresses');
    this.getAddresses();
  }

  getAddresses() {
    this.addresses = this.addressesCollection.snapshotChanges()
      .pipe(
        map((actions) => actions.map(c => c.payload.doc.data()))
      );
  }

  addAddress(idAddress: string, address: Address): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try {
        const id = idAddress || this.afs.createId();
        const data = { id, ...address };
        const result = await this.addressesCollection.doc(id).set(data);
        resolve(result);
      } catch(err) {
        reject(err.message);
      }
    })
  }

  deleteAddress(idAddress: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.addressesCollection
            .doc(idAddress)
            .delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
