import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class PaymentsMethodsService {

    /**
     * Variable que instancia la colección de los metodos de pago del productor
     */
    paymentMethodsCollection: AngularFirestoreCollection<PaymentMethod>;

    /**
     * Variable de tipo Observable que contiene la lista de los metodos de pago vinculados al productor
     */
    paymentMethods: Observable<PaymentMethod[]>;

    /**
     * Variable de tipo string que almacena el id del productor para indicar la ruta de la colección
     */
    producerDoc: AngularFirestoreDocument<User>;

    constructor(public afs: AngularFirestore) {}

    /**
     * 
     * @param uid 
     */
    getProducerDoc(uid: string) {
        this.producerDoc = this.afs.doc<User>(`users/${uid}`);
        this.paymentMethodsCollection = this.producerDoc.collection<PaymentMethod>('paymentmethods');
        this.getPaymentMethods();
    }

    /**
     * Método que obtiene los documentos de la colección de Metodos de pago del productor
     */
    getPaymentMethods() {
        this.paymentMethods = this.paymentMethodsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => a.payload.doc.data() as PaymentMethod))
        );
    }
    
    /**
     * 
     * @param paymentMethod 
     * @param paymentMethodtId 
     * @returns 
     */
    savePaymentMethod(paymentMethodtId: string, payment: PaymentMethod): Promise<void> {

        return new Promise(async (resolve, reject) => {
            try {
                const id = paymentMethodtId || this.afs.createId();
                const data = { id, ...payment };
                const result = await this.paymentMethodsCollection.doc(id).set(data);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    deletePaymentMethod(paymentMethodtId: string): Promise<void> {

        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.paymentMethodsCollection.doc(paymentMethodtId).delete();
                resolve(result);
            } catch (err) {
                reject(err.message);
            }
        });
    }

}
