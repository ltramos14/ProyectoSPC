import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product.model';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /**
   * Variable que instancia la colección de los productos del usuario
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

  uploadPercentage: Observable<number>;

  urlProductImage: Observable<string>;

  constructor(public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar) {
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

  uploadProductImage(productId: string, product: Product, file: File) {
    const id = productId || this.afs.createId();
    const filePath = `products/${id}`;
    product.id = id;
    if (file != undefined) {
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercentage = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => {
        ref.getDownloadURL().subscribe(urlImage => {
          product.image = urlImage;
          this.saveProduct(product).then(() => {
            let operacion = productId ? 'editado' : 'creado';
            this.snackbar.open(`Producto ${operacion} satisfactoriamente`, 'OK', {
              duration: 3000
            })
          }).catch(err => console.log(err))
        });
      })).subscribe();
    } else {
      this.saveProduct(product).then(() => {
        let operacion = productId ? 'editado' : 'creado';
        this.snackbar.open(`Producto ${operacion} satisfactoriamente`, 'OK', {
          duration: 3000
        })
      }).catch(err => console.log(err))
    }
  }

  /**
   * Método que guarda a un nuevo producto en la colección o actualiza un documento
   * @param product el objeto de tipo Product que contiene la información del Producto a editar o crear
   * @param productId el id del documento en caso de que se vaya a actualizar el producto
   * @returns 
   */
  saveProduct(product: Product): Promise<string> {

    return new Promise(async (resolve, reject) => {
      try {
        const { id } = product;
        const data = { id, ...product }
        await this.productsCollection.doc(id).set(data);
        resolve(id);
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

  getProductsWithQuery(limit: number) {
    return this.afs.collection('products', ref => ref.limit(limit)).valueChanges() as Observable<Product[]>;
  }

  getProductsByType(productType: string): Observable<Product[]> {
    return this.afs.collection('products', ref => ref.where('productType', '==', productType)).valueChanges() as Observable<Product[]>;
  }

}
