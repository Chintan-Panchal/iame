import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoggerService } from '../../services/logger/logger.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TwoFactorAuth } from '../../models/two-factor-auth.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public loginForm: FormGroup;
  qrUrl: String;
  totp: number;
  secret: string;
  isTwoFaEnabled: Boolean = false;

  showMessages: any = {};
  provider: string = '';
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    protected router: Router,
    private authService: AuthService,
    private logger: LoggerService) {

    this.loginForm = this.formBuilder.group({
      'password': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required])],
      'totp': [''],
    });
  }

  verifySecret(value) {
    this.errors = this.messages = [];
    let auth: TwoFactorAuth;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const totp = this.loginForm.get('totp').value;
    auth = {
      username: email,
      password: password,
      totp: totp,
    };

    this.authService.verifyTwoFactorSecret(auth).subscribe(res => {
      if (res === true) {
        sessionStorage.setItem('isAuthenticated', 'true');
        this.logger.info('Two factor authentication done successfully.');
        return this.router.navigateByUrl('/pages/dashboard');
      } else {
        this.errors.push('Incorrect secret provided.');
      }
    }, error => {
      this.errors.push('Incorrect secret provided.');
    });
  }

  requiresTwoFactor(value) {
    this.errors = this.messages = [];
    let auth: TwoFactorAuth;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    auth = {
      username: email,
      password: password,
    };

    this.authService.requireTwoFactor(auth).subscribe(res => {
      if (res != null) {
        this.isTwoFaEnabled = true;
        this.qrUrl = res.qrUrl;
        this.totp = res.totp;
      } else {
        this.errors.push('Email, password OR secret combination are not correct, please try again.');
      }
    }, error => {
      this.errors.push('User not found, Invalid credentials.');
    });
  }

}
