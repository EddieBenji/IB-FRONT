import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AppState, getIsAuthenticated, getIsLoading } from '../../app.reducer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginForm: FormGroup;
  private isLoading$: Observable<boolean>;
  private isAuthSubscription: Subscription;

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required ])
    });
    this.isAuthSubscription = this.store.select(getIsAuthenticated)
      .subscribe(
        (isAuth: boolean) => {
          if (isAuth) {
            this.router.navigate([ '/home' ]);
          }
        }
      );
  }

  onLoginSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
  }
}
