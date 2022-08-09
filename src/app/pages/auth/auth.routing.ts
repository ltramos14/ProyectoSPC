import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CheckAuthGuard } from 'src/app/guards/check-auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailComponent } from './send-email/send-email.component';

const routes: Routes = [
    { path: 'olvide-contraseña', component: ForgotPasswordComponent, data: { title: 'Olvidé mi contraseña' }, canActivate: [CheckAuthGuard] },
    { path: 'iniciar-sesion', component: LoginComponent, data: { title: 'Iniciar Sesión' }, canActivate: [CheckAuthGuard] },
    { path: 'registrarse', component: RegisterComponent, data: { title: 'Registrarse' }, canActivate: [CheckAuthGuard] },
    { path: 'verificacion-cuenta', component: SendEmailComponent, data: { tittle: 'Verificación de correo' }, canActivate: [CheckAuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
