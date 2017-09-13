import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentComponent } from './student/student.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'students', component: StudentComponent }
];

export const BethelInstituteRouting = RouterModule.forRoot(APP_ROUTES);
