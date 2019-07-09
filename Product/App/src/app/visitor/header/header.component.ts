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
    // this.catList = Object.keys(response["recordsets"][0]).map((key) => [key, response["recordsets"][0][key]]);
      this.catList = response["recordsets"][0].map((x:any)=>
      {
      return  {"CATEGORY_ID" : x.CATEGORY_ID,"CATEGORY_NAME" : x.CATEGORY_NAME}
      }) ;
      console.log('this.catList',this.catList);
     
      this._adminCategory.GetSubCategoryList().subscribe((response) => 
      {
      
       this.subCatList = response["recordset"].map((x:any)=>
       {
        return  {"CATEGORY_ID" : x.CATEGORY_ID, "SUBCAT_ID" : x.SUBCAT_ID,"SUBCAT_NAME" : x.SUBCAT_NAME}
       });
       console.log('this.subCatList',this.subCatList);

      //  for(let j=0;j<this.catList.length;j++)
      //  {
      //  for(let i=0;i<this.subCatList.length;i++)
      //  {
      //     if(this.catList[j].CATEGORY_ID==this.subCatList[i].CATEGORY_ID)
      //     {
      //     this.newSubCat.push(this.subCatList[i].SUBCAT_NAME);
      //     }
      //  }
      // }
     //  console.log('this.subCatList',this.newSubCat);
       this.filtersLoaded = Promise.resolve(true);
       }, (error) => {
        console.log('error is ', error)
      });

      
     }, (error) => {
      console.log('error is ', error)
    });
    // if(this.filtersLoaded)
    // {
    //   this._adminCategory.GetSubCategoryList().subscribe((response) => 
    //   {
    //    this.subCatList= response["recordset"];
    //    }, (error) => {
    //     console.log('error is ', error)
    //   });
    // }
    

  }
}

