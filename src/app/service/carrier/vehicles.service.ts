import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicle } from 'src/app/models/vehicle.model';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { User } from './../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  /**
   * Variable que instancia la colección del vehiculo del transportador
   */
  vehicleCollection: AngularFirestoreCollection<Vehicle>;

  /**
   * Variable de tipo Observable que contiene la información del vehiculo vinculado al transportador
   */
  vehicle: Observable<Vehicle[]>;

  /**
   * Variable de tipo string que almacena el id del transportador para indicar la ruta de la colección
   */
  carrierDoc: AngularFirestoreDocument<User>;

  uploadPercentage: Observable<number>;

  /**
   * Constructor de VehiclesService
   * @param afs 
   * @param authService 
   */
  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar) {
  }

  getCarrierDoc(uid: string) {
    this.carrierDoc = this.afs.doc<User>(`users/${uid}`);
    this.vehicleCollection = this.carrierDoc.collection<Vehicle>('vehicle');
    this.getCarrierVehicle();
  }

  getCarrierVehicle() {
    this.vehicle = this.vehicleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Vehicle))
    );
  }

  uploadVehicleImage(vehicleId: string, vehicle: Vehicle, file: File) {
    const id = vehicleId || this.afs.createId();
    const filePath = `vehicle/${id}`;
    vehicle.id = id;
    if (file != undefined) {
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercentage = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => {
        ref.getDownloadURL().subscribe(urlImage => {
          vehicle.image = urlImage;
          this.saveVehicle(vehicle).then(() => {
            let operacion = vehicleId ? 'editado' : 'registrado';
            this.snackbar.open(`El vehículo de trabajo fue ${operacion} satisfactoriamente`, 'OK', {
              duration: 3000
            })
          }).catch(err => console.log(err))
        });
      })).subscribe();
    } else {
      console.log(vehicle)
      this.saveVehicle(vehicle).then(() => {
        let operacion = vehicleId ? 'editado' : 'registrado';
        this.snackbar.open(`El vehículo de trabajo fue ${operacion} satisfactoriamente`, 'OK', {
          duration: 3000
        })
      }).catch(err => console.log(err))
    }
  }

  /**
   * Método que actualiza o edita la información del vehiculo en la subcolección 'vehicle' de 'users'
   * @param idVehicle id del vehiculo en caso de que edite, si crea este valor llega null
   * @param vehicle el objeto 
   * @returns 
   */
  saveVehicle(vehicle: Vehicle): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = vehicle;
        const data = { id, ...vehicle }
        await this.vehicleCollection.doc(id).set(data);
        resolve(id);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Método que elimina el vehiculo asociado al perfil de un transportador
   * @param idVehicle
   * @returns 
   */
  deleteVehicle(idVehicle: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.vehicleCollection
          .doc(idVehicle)
          .delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
}
