import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SplashScreenComponent } from './Mobile/splash-screen/splash-screen.component'
import { LoginComponent } from './Mobile/login/login.component';
import { RegisterComponent } from './Mobile/register/register.component'
import { ConfigurationComponent } from './Mobile/configuration/configuration.component'
import { SetAddressComponent } from './Mobile/set-address/set-address.component'
import { PasswordChangeComponent } from './Mobile/password-change/password-change.component'
import { ForgotPasswordComponent } from './Mobile/forgot-password/forgot-password.component'
import { DashboardComponent } from './Mobile/dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: 'mobile/splash-screen', pathMatch: 'full' },
  { path: 'mobile/splash-screen', component: SplashScreenComponent },
  { path: 'mobile/login', component: LoginComponent, data: { animation: 'FilterPage' } },
  { path: 'mobile/register', component: RegisterComponent, data: { animation: 'FilterPage' } },
  { path: 'mobile/configuration', component: ConfigurationComponent, data: { animation: 'FilterPage' } },
  { path: 'mobile/setadress', component: SetAddressComponent, data: { animation: 'FilterPage' } },
  { path: 'mobile/passwordchange', component: PasswordChangeComponent, data: { animation: 'FilterPage' } },
  { path: 'mobile/forgotpassword', component: ForgotPasswordComponent, data: { animation: 'FilterPage' } },
  { path: 'mobile/dashboard', component: DashboardComponent, data: { animation: 'FilterPage' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
