import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatFormFieldModule, MatInputModule, MatListModule, MatExpansionModule, MatDialogModule, MatCheckboxModule,
  MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatOptionModule, MatButtonToggleModule, MatStepperModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { DateRangePickerModule,DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService, FreezeService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule,SwitchModule } from '@syncfusion/ej2-angular-buttons'
import { DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule, IconsModule, CheckboxModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './vendor/dashboard/dashboard.component';
import { VendorContainerComponent } from './vendor/container/container.component';
import { ConfigurationComponent } from './vendor/configuration/configuration.component'
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ProductListComponent } from './vendor/product-list/product-list.component';
import { MyChecklistComponent } from './vendor/my-checklist/my-checklist.component'
import { CategoryComponent } from './admin/category/category.component';
import { AdminCategoryService } from './admin/category/admin-category.service'
import { AgGridModule } from 'ag-grid-angular';
import { SetSchedulerComponent } from './vendor/set-scheduler/set-scheduler.component';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { NewCategoryComponent } from './admin/new-category/new-category.component';
import { AppGlobals } from './app.global';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    VendorContainerComponent,
    ConfigurationComponent,
    ProductListComponent,
    MyChecklistComponent,
    CategoryComponent,
    SetSchedulerComponent,
    AdminContainerComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminCategoryComponent,
    NewCategoryComponent
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
    SwitchModule
  ],
  providers: [PageService, SortService, FilterService, GroupService, AuthGuard, FreezeService, SelectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AppGlobals],
  bootstrap: [AppComponent],
  entryComponents: [ForgotPasswordComponent, ConfigurationComponent,SetSchedulerComponent,NewCategoryComponent]
})
export class AppModule { }
