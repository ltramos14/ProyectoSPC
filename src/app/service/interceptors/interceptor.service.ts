import { 
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor, 
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Paso por el interceptor');
    

    return next.handle(req).pipe(
      catchError(this.manejarError)
    )
  }

  manejarError(error: HttpErrorResponse) {
    return throwError('Error personalizado')
  }
}
