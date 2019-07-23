import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from './admin-category.service'
import { categoryFields } from './categoryFields';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private _adminCategory: AdminCategoryService,private _router:Router) { }


  categoryData = new categoryFields(0, '', '', 1);
  subCategoryData = {};
  catResponse: any;
  catName: any;
  public catData: Array<any> = [];
  public subCatData: Array<any> = [];
  rowDatSubCat: any;
  categoryList: any;
  ngOnInit() {
    this._adminCategory.GetCategoryList().subscribe((response) => {
      this.categoryList = response;
      Object.entries(response).forEach(
        ([key, value]) => {
          this.catData.push(value)
        }
      );
      this.catData.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias })
      })
    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse,"00",error);
      if(error instanceof HttpErrorResponse){
        if(error.status===401){
          console.log("22222222222222attttt");
          this._router.navigate(['/'])
        }
      }
    });

    this._adminCategory.GetSubCategoryList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.subCatData.push(value)
        }
      );

      this.rowDatSubCat = this.subCatData.map((val: any) => {
        this.catName = this.categoryList.filter((ele: any) => ele._id == val.mainProduct)
        return ({
          "_id": val._id, "subCatName": val.subCatName,
          "subCatAlias": val.subCatAlias
          , "catName": this.catName[0].catName
        })
      })
    }, (error) => {
      if(error instanceof HttpErrorResponse){
        if(error.status===401){
          console.log("11111111subbbbbbbbb");
          this._router.navigate(['/'])
        }
      }
      console.log('error is ', error)
    });

  }

  AddCategory() {
    this._adminCategory.AddCategory(this.categoryData).subscribe(response => {
      console.log("Response is",response);
    }, (error) => {
      console.log('error is ', error)
    })
  }

  AddSubCategory() {
    console.log('subCategoryData-', this.subCategoryData);
    this._adminCategory.AddSubCategory(this.subCategoryData)
      .subscribe((res) => {
        console.log('Response body---', res);
      },
        (error) => {
          console.log(error);
        })
  }

  myCellRenderer(params) {
    var eDiv = document.createElement('div');
    eDiv.innerHTML = "&nbsp; <span style='cursor:pointer;' title='Edit Record'><img class='editIcon' src='src/assets/icons/edit.png'   userId='' /></span>";
    var domElement = document.createElement("span");

    var eButton = eDiv.querySelectorAll('.editIcon')[0];
    eButton.addEventListener('click', function () {
      console.log('button was clicked!!', params);
    });
    return eDiv;
  }

  columnDefs = [
    { headerName: 'Edit', field: '', cellRenderer: this.myCellRenderer },
    { headerName: 'Category Name', field: 'catName' },
    { headerName: 'Category Alias', field: 'catAlias' }
  ];

  columnDefSubCat = [
    { headerName: 'Edit', field: '', cellRenderer: this.myCellRenderer },
    { headerName: 'Category Name', field: 'catName', sortable: true, filter: true },
    { headerName: 'Sub Category Name', field: 'subCatName' },
    { headerName: 'Sub Category Alias', field: 'subCatAlias' }
  ];
}
