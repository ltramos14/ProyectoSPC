import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /**
   * Variable qie instancia la colección de los productos del usuario
   */
  productsCollection: AngularFirestoreCollection<Product>;

  /**
   * Variable de tipo Observable que contiene la lista de productos vinculados al usuario
   */  
  products: Observable<Product[]>;

  /**
   * Variable que contiene un documento de Firestore de la colección de productos de productor
   */
  producerProducts: Observable<Product[]>;

  /**
   * Variable de tipo string que almacena el id de usuario para indicar la ruta de la colección
   */  
  productDoc: AngularFirestoreDocument<Product>;
   
  constructor(public afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products');
    this.getProducts();
  }

  /**
   * Método que obtiene los documentos de la colección de Productos del usuario
   */
  getProducts() {
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    );
  }

  async getProducerProducts(producerId: string) {
    this.producerProducts = this.afs.collection('products', ref => ref.where('idProducer', '==', producerId)).snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    );
  }

  /**
   * Método que guarda a un nuevo producto en la colección o actualiza un documento
   * @param product el objeto de tipo Product que contiene la información del Producto a editar o crear
   * @param productId el id del documento en caso de que se vaya a actualizar el producto
   * @returns 
   */
  saveProduct(product: Product, productId: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        const id = productId || this.afs.createId();
        const data = { id, ...product }
        const result = await this.productsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err);
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
