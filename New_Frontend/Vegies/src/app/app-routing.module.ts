import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VendorContainerComponent } from './vendor/container/container.component';
import { DashboardComponent } from './vendor/dashboard/dashboard.component'
import { ProductListComponent } from './vendor/product-list/product-list.component'
import { MyChecklistComponent } from './vendor/my-checklist/my-checklist.component'
import {CategoryComponent} from './admin/category/category.component'
import { AuthGuard } from './auth.guard';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
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
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
        //,canActivate:[AuthGuard] 
      },
      {
        path: 'dashboard', component: DashboardComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'products', component: ProductListComponent
        //,canActivate:[AuthGuard]
      },
      {
        path:'mychecklist', component: MyChecklistComponent
        //,canActivate:[AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: AdminContainerComponent,
    children: [
      {
        path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'
        //,canActivate:[AuthGuard] 
      },
      {
        path: 'admin/dashboard', component: AdminDashboardComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'admin/category', component: AdminCategoryComponent
        //,canActivate:[AuthGuard]
      }
    ]
  },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path :'admin/category',component:CategoryComponent,canActivate:[AuthGuard]}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
