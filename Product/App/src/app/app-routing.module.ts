import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './visitor/home/home.component';
import { ContainerComponent } from './visitor/container/container.component';
import {CategoryComponent} from './admin/category/category.component'

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: HomeComponent },
    ],
  },
  { path :'admin/category',component:CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
