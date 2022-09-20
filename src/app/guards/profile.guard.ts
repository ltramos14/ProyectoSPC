import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { UsersService } from '../service/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UsersService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const activeUrl = state.url;
    this.authService.getCurrentUser().then(({ uid }) => {
      if (activeUrl.includes(`/${uid}`) || activeUrl.includes('/buzon-pqr')) {
        this.userService.getUserInfo(uid).subscribe(async (data) => {
          const { typeuser, isActive, isVerifiedPerson } = data;

          if (!isVerifiedPerson) {
            this.router.navigateByUrl('/');
            return false;
          }

          if (!isActive) {
            this.router.navigateByUrl('/');
            this.snackbar.open(
              'Tu cuenta de usuario se encuentra deshabilitada, por favor contáctate con el administrador a través del correo electrónico: proyectospcudec@gmail.com',
              "OK",
              {
                duration: 0,
              }
            );
            return false;
          }

          switch (typeuser) {
            case 'Administrador':
              this.router.navigate(['/administrador/dashboard']).then(() => false);
              break;
            case 'Productor':
              this.router.navigate([`/perfil-${typeuser.toLowerCase()}/mis-datos/informacion-perfil/${uid}`]).then(() => false);
              break;
            case 'Consumidor':
              this.router.navigate([`/perfil-${typeuser.toLowerCase()}/mis-datos/informacion-perfil/${uid}`]).then(() => false);
              break;
            case 'Transportador':
              this.router.navigate([`/perfil-${typeuser.toLowerCase()}/mis-datos/informacion-perfil/${uid}`]).then(() => false);
              break;
            default:
              this.authService.logout().then(() => this.router.navigate(['/iniciar-sesion']).then(() => false));
          }

        });
      }
      this.userService.getUserInfo(uid).subscribe(async (data) => {
        const { typeuser, isActive, isVerifiedPerson } = data;
        if (activeUrl.includes('solicitar-pedido') || activeUrl.includes('carrito')) {
          if (!isActive) {
            this.snackbar.open(
              'Tu cuenta de usuario se encuentra deshabilitada, por favor contáctate con el administrador a través del correo electrónico: proyectospcudec@gmail.com',
              "OK",
              {
                duration: 0,
              }
            );
            this.router.navigate(['/']).then(() => false);
          }

          if (typeuser !== 'Consumidor') {
            this.router.navigateByUrl('')
            return false;
          }
        }
        if (activeUrl.includes('mis-ordenes')) {
          if (!isVerifiedPerson) {
            this.router.navigate(['/']).then(() => false);
          }

          if (!isActive) {
            this.snackbar.open(
              'Tu cuenta de usuario se encuentra deshabilitada, por favor contáctate con el administrador a través del correo electrónico: proyectospcudec@gmail.com',
              "OK",
              {
                duration: 0,
              }
            );
            this.router.navigate(['/']).then(() => false);
          }

          if (typeuser !== 'Productor' && typeuser !== 'Transportador') {
            this.router.navigateByUrl('')
            return false;
          }
        }

        if (activeUrl.includes('administrador')) {
          if (typeuser !== 'Administrador') {
            this.router.navigateByUrl('')
            return false;
          }
        }
      });
    })
    return true;
  }
}