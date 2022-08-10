import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, LANGUAGE_CODE } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ServerInternalErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    IconModule,

    // Vex
    CustomLayoutModule,
    VexModule,

    //Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    //SPC
    AuthModule,
    CarrierModule,
    ConsumerModule,
    ProducerModule,
    SpcModule,

  ],
  providers: [
    AngularFirestore,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: [
        HTTP_INTERCEPTORS,
        MAT_CHIPS_DEFAULT_OPTIONS
      ],
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: LANGUAGE_CODE,
      useValue: 'es'
    },
    {  
      provide: MAT_CHIPS_DEFAULT_OPTIONS,  
      useValue: {  
        separatorKeyCodes: [ENTER, SPACE]  
      }  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
