import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailComponent } from './send-email/send-email.component';

const routes: Routes = [
    { path: 'olvide-contraseña', component: ForgotPasswordComponent, data: { title: 'Olvidé mi contraseña' } },
    { path: 'iniciar-sesion', component: LoginComponent, data: { title: 'Iniciar Sesión' } },
    { path: 'registrarse', component: RegisterComponent, data: { title: 'Registrarse' } },
    { path: 'verificacion-cuenta', component: SendEmailComponent, data: { tittle: 'Verificación de correo'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
