import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';
import { Cart } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  shoppingCartCollection: AngularFirestoreCollection<Cart>;

  shoppingsCart: Observable<Cart[]>;

  consumerDoc: AngularFirestoreDocument<User>;

  uid: string;

  constructor(public afs: AngularFirestore) {}
  
  getConsumerDoc(uid: string) {
    this.consumerDoc = this.afs.doc<User>(`users/${ uid }`);
    this.shoppingCartCollection = this.consumerDoc.collection<Cart>('shopping-cart');
    this.getProductOnCart();
  }

  getProductOnCart() {
    this.shoppingsCart = this.shoppingCartCollection.snapshotChanges()
      .pipe(
        map((actions) => actions.map(c => c.payload.doc.data()))
      );
  }

  addProductToShoppingCart(productCart: Cart): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.afs.createId();
        const data = { id, ...productCart };
        const result = await this.shoppingCartCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  modifyQuantitysProduct(idCart: string, quantity: number, subtotal: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.shoppingCartCollection.doc(idCart).update({ quantity, subtotal });
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  removeProductFromShoppingCart(idCart: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.shoppingCartCollection
          .doc(idCart)
          .delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  removeAllProductsFromShoppingCart(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.shoppingCartCollection.get().subscribe(res => {
          res.forEach(document => document.ref.delete());
        });
        return result;
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
