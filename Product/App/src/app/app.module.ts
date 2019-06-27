import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule,MatDialogModule,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './visitor/top-header/top-header.component';
import { HeaderComponent } from './visitor/header/header.component';
import { SidebarComponent } from './visitor/sidebar/sidebar.component';
import { ContainerComponent } from './visitor/container/container.component';
import { HomeComponent } from './visitor/home/home.component';
import { RegisterComponent } from './vendor/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './vendor/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    HeaderComponent,
    SidebarComponent,
    ContainerComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,    
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  entryComponents:[RegisterComponent,LoginComponent]
})
export class AppModule { }
