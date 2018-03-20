import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GeneralService } from '../utils/general.service';
import { RequestType } from '../utils/request-type.enum';
import { AppState, getIsAuthenticated } from '../app.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';
import { Router } from '@angular/router';
import { SetAuthenticated, SetUnauthenticated } from './auth.actions';

@Injectable()
export class AuthService {

  constructor(private generalService: GeneralService,
              private store: Store<AppState>,
              private router: Router) {
  }

  logout() {
    // Need to call the back end for invalidating the token!
    this.store.dispatch(new SetUnauthenticated());
    this.router.navigate([ '/login' ]);
  }

  login(authData: { email: string, password: string }) {
    this.store.dispatch(new StartLoading());
    this.generalService.hitBethelApi(RequestType.POST, authData, '/auth/login').subscribe(
      (authInfo: { access_token: string, message: string }) => {
        // Something to do!
        this.store.dispatch(new SetAuthenticated(authInfo.access_token));
        this.store.dispatch(new StopLoading());
        this.router.navigate([ '/home' ]);
      },
      error => {
        this.store.dispatch(new StopLoading());
      }
    );
  }

  testToken() {
    this.store.select(getIsAuthenticated).subscribe(
      (isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate([ '/login' ]);
          return;
        }
        this.store.dispatch(new StartLoading());
        this.generalService.hitBethelApi(RequestType.GET, {}, '/test').subscribe(
          msg => {
            this.store.dispatch(new StopLoading());
            this.router.navigate([ '/home' ]);
          },
          error => this.store.dispatch(new StopLoading())
        );
      }
    );
  }

}
