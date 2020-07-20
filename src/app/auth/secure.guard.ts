import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecureGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      return true;
    }
    return false;
  }
}
