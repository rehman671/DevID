// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ScanComponent } from './pages/scan/scan.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { MlModelComponent } from './pages/ml-model/ml-model.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // Protect dashboard route with AuthGuard
  },
  {
    path: 'scan',
    component: ScanComponent,
    canActivate: [AuthGuard] // Protect scan route with AuthGuard
  },
  {
    path: 'ml',
    component: MlModelComponent,
    canActivate: [AuthGuard] // Protect scan route with AuthGuard
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
