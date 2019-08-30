import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatFormFieldModule, MatInputModule, MatListModule, MatExpansionModule, MatDialogModule, MatCheckboxModule,
  MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatOptionModule, MatButtonToggleModule, MatStepperModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { DateRangePickerModule,DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule,EditService,ToolbarService } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService, FreezeService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule,SwitchModule,RadioButtonModule  } from '@syncfusion/ej2-angular-buttons'
import { DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import {DatePipe} from '@angular/common';
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
import {ToastrModule} from 'ngx-toastr';
import { OwlModule } from 'ngx-owl-carousel';
import { ChangePasswordComponent } from './vendor/change-password/change-password.component';
import { SetAddressComponent } from './vendor/set-address/set-address.component';
import { PreviewChecklistComponent } from './vendor/preview-checklist/preview-checklist.component';
import { AdminSubcategoryComponent } from './admin/admin-subcategory/admin-subcategory.component';
import { NewSubcategoryComponent } from './admin/new-subcategory/new-subcategory.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { MyOrdersComponent } from './vendor/my-orders/my-orders.component';
import { OrderItemsComponent } from './vendor/order-items/order-items.component';
import { OrderReportComponent } from './vendor/reports/order-report/order-report.component';
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
    NewCategoryComponent,
    ChangePasswordComponent,
    SetAddressComponent,
    PreviewChecklistComponent,
    AdminSubcategoryComponent,
    NewSubcategoryComponent,
    AdminProductComponent,
    NewProductComponent,
    MyOrdersComponent,
    OrderItemsComponent,
    OrderReportComponent
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
      timeOut:1000,
      positionClass:'toast-top-right',
      preventDuplicates:true
    }),
    OwlModule
  ],
  providers: [PageService,EditService,ToolbarService, SortService, FilterService, GroupService, AuthGuard, FreezeService, SelectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AppGlobals,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ForgotPasswordComponent,ChangePasswordComponent, 
    ConfigurationComponent,SetSchedulerComponent,NewCategoryComponent,SetAddressComponent,PreviewChecklistComponent,NewSubcategoryComponent,
  NewProductComponent]
})
export class AppModule { }
