import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule,MatListModule,MatStepperModule, MatExpansionModule, MatDialogModule,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './visitor/top-header/top-header.component';
import { HeaderComponent } from './visitor/header/header.component';
import { ContainerComponent } from './visitor/container/container.component';
import { HomeComponent } from './visitor/home/home.component';
import { RegisterComponent } from './vendor/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './vendor/login/login.component';
import { DashboardComponent } from './vendor/dashboard/dashboard.component';
import { SidebarComponent } from './vendor/sidebar/sidebar.component';
import { VendorContainerComponent } from './vendor/container/container.component';
import { ConfigurationwizardComponent } from './vendor/configurationwizard/configurationwizard.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    HeaderComponent,
    ContainerComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    VendorContainerComponent,
    ConfigurationwizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,   
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb1-CCxWk4r7byFIduqkNOc9QPPxSdcyA',
      libraries: ["places"]
})
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  entryComponents:[RegisterComponent,LoginComponent,ConfigurationwizardComponent]
})
export class AppModule { }
