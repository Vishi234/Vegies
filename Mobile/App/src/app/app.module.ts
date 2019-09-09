import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatFormFieldModule, MatInputModule, MatListModule, MatExpansionModule, MatDialogModule, MatCheckboxModule,
  MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatOptionModule, MatButtonToggleModule, MatStepperModule
,MatTabsModule} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { DateRangePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService, FreezeService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule, SwitchModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons'
import { DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DatePipe } from '@angular/common';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule, IconsModule, CheckboxModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AgGridModule } from 'ag-grid-angular';
import { AppGlobals } from './app.global';
import { ToastrModule } from 'ngx-toastr';
import { OwlModule } from 'ngx-owl-carousel';
import { LoadingComponent } from './Mobile/loading/loading.component';
import { SplashScreenComponent } from './Mobile/splash-screen/splash-screen.component';
import { LoginComponent } from './Mobile/login/login.component';
import{LoadingInterceptor} from './Mobile/loading/loading.interceptors';
import { RegisterComponent } from './Mobile/register/register.component';
import { ConfigurationComponent } from './Mobile/configuration/configuration.component';
import { DashboardComponent } from './Mobile/dashboard/dashboard.component';
import { SetAddressComponent } from './Mobile/set-address/set-address.component';
import { PasswordChangeComponent } from './Mobile/password-change/password-change.component';
import { ForgotPasswordComponent } from './Mobile/forgot-password/forgot-password.component';
import { SideNavComponent } from './Mobile/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    SplashScreenComponent,
    LoginComponent,
    RegisterComponent,
    ConfigurationComponent,
    DashboardComponent,
    SetAddressComponent,
    PasswordChangeComponent,
    ForgotPasswordComponent,
    SideNavComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MDBBootstrapModule.forRoot(),
    IconsModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    DateRangePickerModule,
    GridModule,
    CheckBoxModule,
    Ng2CarouselamosModule,
    MatButtonToggleModule,
    MatStepperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb1-CCxWk4r7byFIduqkNOc9QPPxSdcyA',
      libraries: ["places"]
    }),
    MatGoogleMapsAutocompleteModule,
    HttpClientModule,
    DropDownListModule,
    AutoCompleteModule,
    MatCheckboxModule,
    AgGridModule.withComponents([]),
    DatePickerModule,
    SwitchModule,
    RadioButtonModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      tapToDismiss: false,
      toastClass: "custom-toastr-class",
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),
    OwlModule,
    MatTabsModule,
    TabModule
  ],
  providers: [PageService, EditService, ToolbarService, SortService, FilterService, GroupService, AuthGuard, FreezeService, SelectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    AppGlobals, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
