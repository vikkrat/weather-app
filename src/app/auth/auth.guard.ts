import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public router: Router) {}

  canActivate(): boolean {
    const user = this.afAuth.auth.currentUser;
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}







// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class AuthGuard implements CanActivate {
//
//   constructor(
//     public authService: AuthService,
//     public router: Router
//   ) { }
//
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     if(this.authService.isLoggedIn !== true) {
//       this.router.navigate(['login']);
//     }
//     return true;
//   }
// }
