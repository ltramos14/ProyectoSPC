import { Injectable } from "@angular/core";
import {
  CanActivate,
} from "@angular/router";
import { AuthService } from "../service/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class CheckAuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  async canActivate() {
    let response = false;
    const user = await this.authService.getCurrentUser();
    user ? response = false: response = true;

    return response;
  }

}
