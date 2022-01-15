import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, LANGUAGE_CODE } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconModule } from '@visurel/iconify-angular';
import { VexModule } from '../@vex/vex.module';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './pages/auth/auth.module';
import { CarrierModule } from './pages/carrier/carrier.module';
import { ConsumerModule } from './pages/consumer/consumer.module';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { ProducerModule } from './pages/producer/producer.module';
import { ServerInternalErrorComponent } from './pages/error/server-internal-error/server-internal-error.component';
import { SpcModule } from './pages/spc/spc.module';
import { InterceptorService } from './service/interceptors/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ServerInternalErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    IconModule,

    // Vex
    VexModule,
    CustomLayoutModule,

    //Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    //SPC
    AuthModule,
    SpcModule,
    ProducerModule,
    ConsumerModule,
    CarrierModule
  ],
  providers: [
    AngularFirestore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: LANGUAGE_CODE,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
