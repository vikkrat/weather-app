import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: firebase.User;
  loggedIn: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn;
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.signOut();
  }

  register() {
    this.router.navigate(['/register']);
  }

}
