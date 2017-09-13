import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BethelInstituteRouting } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    BethelInstituteRouting,
    FormsModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
