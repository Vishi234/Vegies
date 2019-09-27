import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { SplashScreenComponent } from './splash-screen/splash-screen.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ConfigurationComponent } from './configuration/configuration.component'
import { SetAddressComponent } from './set-address/set-address.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { MychecklistComponent } from './mychecklist/mychecklist.component'
import { ItemDetailsComponent } from './item-details/item-details.component'
import { OrderplacedComponent } from './orderplaced/orderplaced.component'
const routes: Routes = [
  { path: '', redirectTo: 'splash-screen', pathMatch: 'full', data: { animation: 'FilterPage' } },
  { path: 'splash-screen', component: SplashScreenComponent, data: { animation: 'FilterPage' } },
  { path: 'auth', component: UserAuthComponent, data: { animation: 'FilterPage' } },
  { path: 'change', component: ChangePasswordComponent, data: { animation: 'FilterPage' } },
  { path: 'forgot', component: ForgotPasswordComponent, data: { animation: 'FilterPage' } },
  { path: 'configuration', component: ConfigurationComponent, data: { animation: 'FilterPage' } },
  { path: 'address', component: SetAddressComponent, data: { animation: 'FilterPage' } },
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'FilterPage' } },
  { path: 'mychecklist', component: MychecklistComponent, data: { animation: 'FilterPage' } },
  { path: 'itemdetails', component: ItemDetailsComponent, data: { animation: 'FilterPage' } },
  { path: 'placed', component: OrderplacedComponent, data: { animation: 'FilterPage' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
