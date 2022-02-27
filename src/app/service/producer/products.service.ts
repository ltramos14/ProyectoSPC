import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { convertTimestampsPipe } from 'convert-firebase-timestamp'
import { environment } from './../../../environments/environment';

const baseUrl = environment.apiUrl + '/products';

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

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
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
      map(actions => actions.map(a => a.payload.doc.data() as Product)),
      convertTimestampsPipe()
    );
  }

  /**
   * 
   * @param producerId 
   */
  getProducerProducts(producerId: string) {
    return this.afs.collection('products', ref => ref.where('idProducer', '==', producerId)).snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product)),
      convertTimestampsPipe()
    );
  }

  /**
   * 
   * @param productId 
   * @param product 
   * @param file 
   */
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

  /**
   * 
   * @param productId 
   * @returns 
   */
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

  /**
   * 
   * @param id 
   * @returns 
   */
  getProductById(id: string) {
    return this.afs.collection('products').doc(id).valueChanges() as Observable<Product>;
  }

  /**
   * 
   * @param idProducer 
   * @returns 
   */
  getProductsByIdProducer(idProducer: string): Observable<Product[]> {
    return this.afs.collection('products', ref => ref.where('idProducer', '==', idProducer)).valueChanges() as Observable<Product[]>;
  }

  /**
   * 
   * @param productType 
   * @returns 
   */
  getProductsByType(productType: string): Observable<Product[]> {
    let type = null;

    if (productType === 'frutas' || productType === 'Frutas') {
      type = 'Frutas';
    } else if (productType === 'hortalizas' || productType === 'Hortalizas') {
      type = 'Hortalizas';
    } else if (productType === 'tuberculos' || productType === 'Tubérculos') {
      type = 'Tubérculos';
    } else if (productType === 'granos' || productType === 'Granos') {
      type = 'Granos';
    } else {
      type = 'Hierbas y aromáticas';
    }
    return this.afs.collection('products', ref => ref.where('productType', '==', type)).valueChanges() as Observable<Product[]>;
  }

  /**
 * 
 * @param limit 
 * @returns 
 */
  getProductsWithQuery(limit: number) {
    return this.afs.collection('products', ref => ref.limit(limit)).valueChanges() as Observable<Product[]>;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  updateProductiveStatus(id: string) {
    return this.http.put(`${baseUrl}/${id}/productive-status`, {});
  }

  /**
   * 
   */
  validateProductiveStatus() {
    this.products.subscribe(products => {
      products.forEach(product => {
        if (product.availabilityDate && new Date(product.availabilityDate).getTime() <= new Date(Date.now()).getTime()) {
          this.updateProductiveStatus(product.id).subscribe();
        }
      })
    })
  }

}
