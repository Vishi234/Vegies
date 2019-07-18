import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../../vendor/register/register.component';
import { LoginComponent } from '../../vendor/login/login.component';
import { AdminCategoryService } from '../../admin/category/admin-category.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //constructor(public dialog: MatDialog) { }
  constructor(private _adminCategory: AdminCategoryService,public dialog: MatDialog) { }
  
  OpenRegisterModal() {
    this.dialog.open(RegisterComponent, { disableClose: true })
  }
  OpenLoginModal() {
    this.dialog.open(LoginComponent, { disableClose: true })
  }
  
  public catList:any;
  subCatList:any;
  filtersLoaded: Promise<boolean>;
  newSubCat=[];

  ngOnInit() 
  {

    this._adminCategory.GetCategoryList().subscribe((response) => 
    {
      this.catList = response;
      console.log('this.catList',this.catList);
      this._adminCategory.GetSubCategoryList().subscribe((response) => 
      {      
       this.subCatList = response;
       console.log('this.subCatList',this.subCatList);
       this.filtersLoaded = Promise.resolve(true);
       }, (error) => {
        console.log('error is ', error)
      });      
     }, (error) => {
      console.log('error is ', error)
    });
  }
}

