import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { GeneralService } from '../utils/general.service';
import { NotificationService } from '../utils/notification/notification.service';
import { RequestType } from '../utils/request-type.enum';
import { AppState } from '../app.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';

@Injectable()
export class AuthService extends GeneralService {

  constructor(protected http: HttpClient, protected notifService: NotificationService,
              private store: Store<AppState>) {
    super(http, notifService);
  }

  login(authData: { email: string, password: string }) {
    console.log(authData);
    this.store.dispatch(new StartLoading());
    setTimeout(() => {
      this.store.dispatch(new StopLoading());
    }, 3000);
    // this.hitBethelApi(RequestType.POST, authData, '/login').subscribe(
    //   (authInfo) => {
    //     // Something to do!
    //   }
    // );
  }

}
