import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AirplaneListComponent } from './pages/airplane-list/airplane-list.component';
import { airplaneListResolver } from './resolvers/airplane-list.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'airplane',
        component: AirplaneListComponent,
        resolve: {
          airplanes: airplaneListResolver,
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
