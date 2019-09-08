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

const routes: Routes = [
  { path: '', redirectTo: 'mobile/splash-screen', pathMatch: 'full' },
  { path: 'mobile/splash-screen', component: SplashScreenComponent },
  { path: 'mobile/login', component: LoginComponent },
  { path: 'mobile/register', component: RegisterComponent },
  { path: 'mobile/configuration', component: ConfigurationComponent },
  { path: 'mobile/setadress', component: SetAddressComponent },
  { path: 'mobile/passwordchange', component: PasswordChangeComponent },
  { path: 'mobile/forgotpassword', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
