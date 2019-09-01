import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { AdminCategoryService } from '../category/admin-category.service';
import {Router} from '@angular/router';
import {EditSettingsModel,ToolbarItems}  from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public editOptions:EditSettingsModel={allowAdding:true,allowEditing:true,allowDeleting:true,mode:'Normal'};
  public toolbarOptions:ToolbarItems[]=['Add','Edit','Delete','Update','Cancel'];
  
  public categorydata: any;
  public subcategorydata:any;
  //public catData: Array<any> = [];
  public filterSettings: Object;
  public pageSettings: object;
  constructor(public dialog: MatDialog,private _adminCategory: AdminCategoryService,private _router:Router) { }

  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this._adminCategory.GetCategoryList().subscribe((response) => {
      this.categorydata = response;
      this.categorydata.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias,"Active":val.Active })
      })
    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse,"00",error);
      if(error instanceof HttpErrorResponse){
        if(error.status===401){

          this._router.navigate(['/'])
        }
      }
    });
  }
  addNewCategory() {
    this.dialog.open(NewCategoryComponent, { disableClose: true })
  }
}
