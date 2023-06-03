import { Component, OnInit } from '@angular/core';
import { LoginFacade } from './+state/login.facade';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  isLoggingIn$: Observable<boolean>;
  errors$: Observable<any>;

  loginForm = this.fb.group({
    username: ["", Validators.required]
  })

  constructor(private loginFacade: LoginFacade, private fb: FormBuilder,) {
    this.isLoggingIn$ = loginFacade.isLoggingIn$
    this.errors$ = loginFacade.error$
  }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    
    if (this.loginForm.value["username"]) {
      this.loginFacade.login(this.loginForm.value["username"])
    }
  }
}
