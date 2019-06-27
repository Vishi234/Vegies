import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './visitor/home/home.component';
import { ContainerComponent } from './visitor/container/container.component';
import { RegisterComponent } from './vendor/register/register.component';

const routes: Routes = [
  { 
    path: '', 
    component: ContainerComponent,
    children: [
      { path: '', redirectTo:'index', pathMatch: 'full'},
      { path: 'index', component: HomeComponent},
    ]
},
  { path: 'vendor/register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
