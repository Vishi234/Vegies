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
import { CategoryComponent } from './admin/category/category.component'
import { AuthGuard } from './auth.guard';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSubcategoryComponent } from './admin/admin-subcategory/admin-subcategory.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { MyOrdersComponent } from './vendor/my-orders/my-orders.component'
import { OrderItemsComponent } from './vendor/order-items/order-items.component'
import { OrderReportComponent } from './vendor/reports/order-report/order-report.component'
import { UserListComponent } from './admin/users/user-list/user-list.component'
import { UserChecklistComponent } from './admin/users/user-checklist/user-checklist.component'
import { UserOrdersComponent} from './admin/users/user-orders/user-orders.component'
import { productListResolver } from './vendor/product-list/product-list-resolver.service';
const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' ,resolve:{userData:productListResolver}},
      { path: 'index', component: HomeComponent ,resolve:{userData:productListResolver}},
    ]
  },
  {
    path: '',
    component: VendorContainerComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full',
        resolve:{userData:productListResolver}
        //,canActivate:[AuthGuard] 
      },
      {
        path: 'dashboard', component: DashboardComponent,
        resolve:{userData:productListResolver}
        //,canActivate:[AuthGuard]
      },
      {
        path: 'products/:id', component: ProductListComponent,
        resolve:{userData:productListResolver}
        //,canActivate:[AuthGuard]
      },
      {
        path: 'products', component: ProductListComponent,
        resolve:{userData:productListResolver}
        //,canActivate:[AuthGuard]
      },
      {
        path: 'mychecklist', component: MyChecklistComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'orders', component: MyOrdersComponent,
        //,canActivate:[AuthGuard]
      },
      {
        path: 'orders/items/:id', component: OrderItemsComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'reports/order-report', component: OrderReportComponent,
        resolve:{userData:productListResolver}
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
      },
      {
        path: 'admin/subcategory', component: AdminSubcategoryComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'admin/product', component: NewProductComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'admin/user-list', component: UserListComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'admin/user-checklist', component: UserChecklistComponent
        //,canActivate:[AuthGuard]
      },
      {
        path: 'admin/user-orders', component: UserOrdersComponent
        //,canActivate:[AuthGuard]
      }
    ]
  },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/category', component: CategoryComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
