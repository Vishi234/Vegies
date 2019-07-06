import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from './admin-category.service'
import { categoryFields } from './categoryFields';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private _adminCategory: AdminCategoryService) { }
  categoryData = new categoryFields(0, '', '', 1, 0, '', '', 'A', 0, 1);
  subCategoryData = {}
  catResponse: any;
  rowData: any;
  ngOnInit() {
    this._adminCategory.getAPIData().subscribe((response) => {
      var result = Object.keys(response).map(function (key) {
        return [Number(key), response[key]];
      });
      this.rowData = result[1][1];
      console.log('response is ', response)
      this.catResponse = response;
    }, (error) => {
      console.log('error is ', error)
    })
  }

  addCategoryData() {
    console.log("hiiiiiiiiiiii", this.categoryData);
    this._adminCategory.adminCategory(this.categoryData).subscribe(response => {
      var result = Object.keys(response).map(function (key) {
        return [Number(key), response[key]];
      });
      this.rowData = result[1][1];
      console.log("response is", this.rowData)
    }, (error) => {
      console.log('error is ', error)
    })
  }

  addSubCategoryData() {
    this._adminCategory.adminCategory(this.subCategoryData)
      .subscribe((res) => {
        console.log('Response body---', res);
      },
        (error) => {
          console.log(error);
        })
  }

  columnDefs = [
    { headerName: 'CATEGORY_ID', field: 'CATEGORY_ID', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'CATEGORY_NAME', field: 'CATEGORY_NAME' }
  ];

}
