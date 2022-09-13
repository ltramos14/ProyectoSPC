import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tariff } from 'src/app/interfaces/tariff.interface';
import { OrderRequest } from 'src/app/models/order-request.model';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl + '/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersCollection: AngularFirestoreCollection<Order>;

  orders: Observable<Order[]>;

  orderDoc: AngularFirestoreDocument<Order>;

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
  ) {
    this.ordersCollection = afs.collection<Order>('orders');
  }

  getOrderProducts(uid: string) {
    return this.http.get<OrderRequest[]>(`${ baseUrl }/order-products/${ uid }`);
  }

  getOrdersByUser(uid: string, typeId: string) {
    return this.afs.collection('orders', ref => ref.where(typeId, '==', uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Order))
    );
  }

  getOrderById(orderId: string) {
    return this.afs.collection('orders').doc(orderId).valueChanges() as Observable<Order>;
  }

  saveOrder(order: Order): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = order.id || this.afs.createId();
        const data = { id, ...order };
        await this.ordersCollection.doc(id).set(data);
        resolve(id);
      } catch (err) {
        reject(err);
      }
    })
  }

  confirmOrder(orderRequest: OrderRequest, idConsumer: string): Order {
    const order: Order = {
      idProducer: orderRequest.idProducer,
      idConsumer,
      orderDate: new Date(),
      products: orderRequest.products,
      address: orderRequest.address,
      total: orderRequest.total,
      chosenPayment: orderRequest.chosenPayment,
      status: "Pendiente de pago",
      paymentLimitDate: this.setPaymentLimitDate(),
    }
    return order;
  }

  deleteOrder(orderId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.ordersCollection.doc(orderId).delete();
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  setPaymentLimitDate(): Date {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    d.setHours(23, 59, 59, 59);
    return d
  }

  searchCarriersByMunicipality(municipalities: string[]) {
    return this.http.post<any[]>(`${ baseUrl }/available-carriers`, municipalities);
  }

  calculateOrderTariff(data: Tariff): Observable<any> {
    return this.http.post(`${ baseUrl }/calculate-order-tariff`, data)
  }

}
