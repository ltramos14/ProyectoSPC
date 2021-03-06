import { Injectable } from '@angular/core';
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
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const activeUrl = state.url;
    this.authService.getCurrentUser().then(({ uid }) => {
      if (activeUrl.includes('/mis-datos/informacion-perfil/') || activeUrl.includes('/buzon-pqr')) {
        this.userService.getUserInfo(uid).subscribe(async (data) => {
          const { typeuser } = data;
          switch (typeuser) {
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
      if (activeUrl.includes('solicitar-pedido') || activeUrl.includes('carrito')) {
        this.userService.getUserInfo(uid).subscribe(async (data) => {
          const { typeuser } = data;
          if (typeuser !== 'Consumidor') {
            this.router.navigateByUrl('')
            return false;
          }
        });
      }
    })
    return true;
  }
}