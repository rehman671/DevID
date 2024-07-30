import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ScanComponent } from './pages/scan/scan.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { MlModelComponent } from './pages/ml-model/ml-model.component';
import { OtpComponent } from './pages/otp/otp.component';
import { OtpGuard } from './otp.guard';
import { DeviceManagementComponent } from './pages/device-management/device-management.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
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
    canActivate: [AuthGuard] // Protect ml route with AuthGuard
  },
  {
    path: 'device',
    component: DeviceManagementComponent,
    canActivate: [AuthGuard] // Protect ml route with AuthGuard
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'otp',
    component: OtpComponent,
    canActivate: [OtpGuard] // Protect otp route with OtpGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
