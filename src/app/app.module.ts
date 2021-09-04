import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';


import { SpcModule } from './pages/spc/spc.module';
import { AuthModule } from './pages/auth/auth.module';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { ServerInternalErrorComponent } from './pages/error/server-internal-error/server-internal-error.component';

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

    // Vex
    VexModule,
    CustomLayoutModule,

    //SPC
    AuthModule,
    SpcModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
