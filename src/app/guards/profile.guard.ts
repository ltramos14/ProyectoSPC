import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../service/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UsersService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      this.userService.getUserInfo(localStorage.getItem('uid')).subscribe(data => {
        const { typeuser, uid } = data;
        switch (typeuser) {
          case 'Productor':
            this.router.navigate([`/perfil-${ typeuser.toLowerCase() }/mis-datos/informacion-perfil/${ uid }`]).then(() => false);
            break;
          case 'Consumidor':
            this.router.navigate([`/perfil-${ typeuser.toLowerCase() }/mis-datos/informacion-perfil/${ uid }`]).then(() => false);
            break;
          case 'Transportador':
            this.router.navigate([`/perfil-${ typeuser.toLowerCase() }/mis-datos/informacion-perfil/${ uid }`]).then(() => false);
            break;
        }
      });
      
      return true;
  }
  
  
}
