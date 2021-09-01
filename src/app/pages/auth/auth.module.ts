import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ForgotPasswordModule,
    LoginModule,
    RegisterModule
  ]
})
export class AuthModule { }
