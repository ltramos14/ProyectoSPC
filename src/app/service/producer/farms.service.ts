import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/interfaces/user.interface";
import { Farm } from "src/app/models/farm.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class FarmsService {

  /**
   * Variable que instancia la colección de las fincas del productor
   */
  farmsCollection: AngularFirestoreCollection<Farm>;

  /**
   * Variable de tipo Observable que contiene la lista de fincas vinculados al productor
   */
  farms: Observable<Farm[]>;

  /**
   * Variable de tipo string que almacena el id del productor para indicar la ruta de la colección
   */
  producerDoc: AngularFirestoreDocument<User>;

  /**
   * Constructor de FarmsService
   * @param afs 
   * @param authService 
   */
  constructor(public afs: AngularFirestore) {
  }

  getProducerDoc(uid: string) {
    this.producerDoc = this.afs.doc<User>(`users/${uid}`);
    this.farmsCollection = this.producerDoc.collection<Farm>('farms');
    this.getFarms();
  }

  /**
   * Método que obtiene los documentos de la colección de Fincas del productor
   */
  getFarms() {
    this.farms = this.farmsCollection.snapshotChanges()
      .pipe(map((actions) => actions.map((a) => a.payload.doc.data() as Farm)));
  }

  /**
   * Método que actualiza o edita la información de una fica en la subcolección 'farms' de 'users'
   * @param idFarm id en la finca en caso de que edite, si crea este valor llega null
   * @param farm el objeto 
   * @returns 
   */
  saveFarm(idFarm: string, farm: Farm): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = idFarm || this.afs.createId();
        const data = { id, ...farm };
        const result = await this.farmsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Método que elimina la finca de un productor asociada a su perfil
   * @param idFarm 
   * @returns 
   */
  deletePaymentMethod(idFarm: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.farmsCollection
          .doc(idFarm)
          .delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
