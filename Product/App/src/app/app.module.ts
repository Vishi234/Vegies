import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatFormFieldModule, MatCardModule, MatSlideToggleModule, MatInputModule, MatListModule, MatStepperModule,
  MatExpansionModule, MatDialogModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatIconModule,MatPaginator,MatTableModule,MatTooltipModule,MatMenuModule,MatToolbarModule,MatButtonToggleModule,
  MatTabsModule
} from '@angular/material';
// Import your library
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { AgGridModule } from 'ag-grid-angular';
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
import { CategoryComponent } from './admin/category/category.component';
import { AdminCategoryService } from './admin/category/admin-category.service'
import { LoaderComponent } from './common/components/loader/loader.component'
import { AgGridComponent } from './common/components/ag-grid/ag-grid.component';
import { LoginRegisterComponent } from './visitor/login-register/login-register.component';

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
    ConfigurationwizardComponent,
    CategoryComponent,
    LoaderComponent,
    AgGridComponent,
    MatPaginator,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    MatListModule,
    MatCardModule,
    MatGoogleMapsAutocompleteModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb1-CCxWk4r7byFIduqkNOc9QPPxSdcyA',
      libraries: ["places"]
    }),
    MatCheckboxModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    Ng2CarouselamosModule,
    MatButtonToggleModule,
    MatTabsModule
  ],
  providers: [AdminCategoryService,
    {
      provide: [ErrorStateMatcher, HTTP_INTERCEPTORS], useClass: ShowOnDirtyErrorStateMatcher,
      multi: true
    },
    AgGridComponent,
    LoaderComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent, LoginComponent, ConfigurationwizardComponent,LoginRegisterComponent]
})
export class AppModule { }
