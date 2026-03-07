import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';

export const routes: Routes = [

  {
    path: 'auth/login',
    component: LoginComponent
  },

  {
    path: 'auth/register',
    component: RegisterComponent
  },
  
   {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }

];

