import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsCollection: AngularFirestoreCollection<Product>;

  products: Observable<Product[]>;

  producerProducts: Observable<Product[]>;

  productDoc: AngularFirestoreDocument<Product>;
   
  constructor(public afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products');
    this.getProducts();
  }

  getProducts() {
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    );
  }

  async getProducerProducts(producerId: string) {
    this.producerProducts = await this.productsCollection.valueChanges();
  }
  
  saveProduct(product: Product, productId: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        const id = productId || this.afs.createId();
        const data = { id, ...product }
        const result = await this.productsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });

  }

  deleteProduct(productId: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.productsCollection.doc(productId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });

  }
}
