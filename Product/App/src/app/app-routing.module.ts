import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './visitor/home/home.component';
import { ContainerComponent } from './visitor/container/container.component';
import { DashboardComponent } from './vendor/dashboard/dashboard.component';
import { VendorContainerComponent } from './vendor/container/container.component';
import {CategoryComponent} from './admin/category/category.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: HomeComponent },
    ]
  },
  {
    path: '',
    component: VendorContainerComponent,
    children: [
      { path: '', redirectTo: 'vendor/dashboard', pathMatch: 'full',canActivate:[AuthGuard] },
      { path: 'vendor/dashboard/:id', component: DashboardComponent,canActivate:[AuthGuard] },
    ]
  },
  { path :'admin/category',component:CategoryComponent,canActivate:[AuthGuard]}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
