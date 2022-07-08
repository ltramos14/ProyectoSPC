import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl + '/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  sendPurchaseRequest(idProducer: string) {
    return this.http.post(`${ baseUrl }/purchase-request/${ idProducer }`, null);
  }

}
