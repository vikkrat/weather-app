import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../shared/validators/password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  myForm: FormGroup;
  get userEmail() {
    return this.myForm.controls.userEmail;
  }
  get userPassword() {
    return this.myForm.controls.userPassword;
  }
  get confPassword() {
    return this.myForm.controls.confPassword;
  }

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.myForm = formBuilder.group({
      userEmail: ['', [ Validators.required, Validators.email]],
      userPassword: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      confPassword: ['', [ Validators.required]],
    }, {validator: passwordValidator});
  }

  ngOnInit() {  }

  register() {
    this.auth.signUp(this.myForm.value.userEmail, this.myForm.value.userPassword);
  }

  registerWithGoogle() {
    this.auth.googleAuth();
  }

}
