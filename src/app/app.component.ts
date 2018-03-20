import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState, getIsAuthenticated } from './app.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Instituto Bíblico Bethel!!';
  public isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(getIsAuthenticated);
  }

  ngAfterViewInit(): void {
    this.authService.testToken();
  }

  onLogout() {
    this.authService.logout();
  }
}
