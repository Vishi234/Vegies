import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ReactiveFormsModule,FormsModule } from '@angular/forms'
import { MatTabsModule, MatFormFieldModule, MatInputModule,MatButtonToggleModule,MatSidenavModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './loading/loading.interceptors';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { DateRangePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService, FreezeService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule, SwitchModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons'
import { DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { TokenInterceptorService } from './token-interceptor.service';
import { AppGlobals } from './app.global';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetAddressComponent } from './set-address/set-address.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MychecklistComponent } from './mychecklist/mychecklist.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { OrderplacedComponent } from './orderplaced/orderplaced.component';
import { ProductsComponent } from './products/products.component';
import { detailsListResolver } from './dashboard/details-list-resolver.service';
@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    ChangePasswordComponent,
    SplashScreenComponent,
    LoadingComponent,
    ForgotPasswordComponent,
    ConfigurationComponent,
    DashboardComponent,
    SetAddressComponent,
    SideNavComponent,
    MychecklistComponent,
    ItemDetailsComponent,
    OrderplacedComponent,
    ProductsComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb1-CCxWk4r7byFIduqkNOc9QPPxSdcyA',
      libraries: ["places"]
    }),
    MatGoogleMapsAutocompleteModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      tapToDismiss: false,
      toastClass: "custom-toastr-class",
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),
    TabModule,
    MatButtonToggleModule,
    MatSidenavModule,
    RadioButtonModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
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
    },AppGlobals, DatePipe,detailsListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
