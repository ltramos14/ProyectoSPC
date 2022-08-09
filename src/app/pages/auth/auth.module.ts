import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RegisterModule } from './register/register.module';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ForgotPasswordModule,
    LoginModule,
    RegisterModule
  ]
})
export class AuthModule { }
