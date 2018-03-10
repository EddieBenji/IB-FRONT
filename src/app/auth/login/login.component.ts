import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { AppState, getIsLoading } from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required ])
    });
  }

  onLoginSubmit() {
    console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    // this.authService.login({
    //   email: 'eduardo.942712@gmail.com',
    //   password: 'lalal'
    // });
  }

}
