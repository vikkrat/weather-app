import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  get userEmail() {
    return this.myForm.controls.userEmail;
  }
  get userPassword() {
    return this.myForm.controls.userPassword;
  }

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
) {
    this.myForm = formBuilder.group({
      userEmail: ['', [ Validators.required, Validators.email]],
      userPassword: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    });
  }

  ngOnInit() {  }

  login() {
    this.auth.signIn(this.myForm.value.userEmail, this.myForm.value.userPassword);
  }

  loginWithGoogle() {
    this.auth.googleAuth();
  }

}
