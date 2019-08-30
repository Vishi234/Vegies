import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdminCategoryService } from '../category/admin-category.service';
import { categoryFields } from '../category/categoryFields';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-new-subcategory',
  templateUrl: './new-subcategory.component.html',
  styleUrls: ['./new-subcategory.component.scss']
})
export class NewSubcategoryComponent implements OnInit {
  categoryData = new categoryFields(0, '', '', 1);
  categoryList: any;
  public catList: Array<any> = [];
  public subCatData: Array<any> = [];
  public fields: Object = { text: "catName", value: "_id" };
  constructor(public dialog: MatDialog,private _adminCategory: AdminCategoryService,private _router:Router) { }

  ngOnInit()
   {
    this._adminCategory.GetCategoryList().subscribe((response) => {
      this.categoryList = response;
      Object.entries(response).forEach(
        ([key, value]) => {
          this.catList.push(value);
        }
      );
      this.categoryList.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName })
      })
      console.log('this.catelist',this.catList)
    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse,"00",error);
      if(error instanceof HttpErrorResponse){
        if(error.status===401){
          this._router.navigate(['/'])
        }
      }
    });
  }

  AddSubCategory() {
    this._adminCategory.AddSubCategory(this.subCatData).subscribe(response => {
      console.log("Response is",response);
    }, (error) => {
      console.log('error is ', error)
    })
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
