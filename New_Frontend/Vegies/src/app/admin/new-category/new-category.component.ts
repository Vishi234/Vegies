import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdminCategoryService } from '../category/admin-category.service';
import { categoryFields } from '../category/categoryFields';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  categoryData = new categoryFields(0, '', '', 1);
  categoryList: any;
  public catData: Array<any> = [];
  public subCatData: Array<any> = [];
  constructor(public dialog: MatDialog,private _adminCategory: AdminCategoryService,private _router:Router) { }

  ngOnInit()
   {
    this._adminCategory.GetCategoryList().subscribe((response) => {
      this.categoryList = response;
      Object.entries(response).forEach(
        ([key, value]) => {
          this.catData.push(value);
        }
      );
      this.catData.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias,"Active":val.Active })
      })
    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse,"00",error);
      if(error instanceof HttpErrorResponse){
        if(error.status===401){

        //  this._router.navigate(['/'])
        }
      }
    });
  }

  AddCategory() {
    this._adminCategory.AddCategory(this.categoryData).subscribe(response => {
      console.log("Response is",response);
    }, (error) => {
      console.log('error is ', error)
    })
  }
 
  closeModal() {
    this.dialog.closeAll();
  }
}
