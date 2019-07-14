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

  
  categoryData = new categoryFields(0, '', '', 1);
  subCategoryData={};
 // subCategoryData = new categoryFields(2, '', '', 1, 0, '', '', 'A', 0, 1);
  catResponse: any;
  rowData: any;
  rowDatSubCat:any;
  categoryList: any;
  ngOnInit() 
  {
    this._adminCategory.GetCategoryList().subscribe((response) => 
    {
      this.categoryList = response;
      console.log("aaaaaaaaaya",this.categoryList)
     }, (error) => {
      console.log('error is ', error)
    });

    this._adminCategory.GetSubCategoryList().subscribe((response) => 
    {
      this.rowDatSubCat = response["recordset"];
      console.log('data',this.rowDatSubCat);
     }, (error) => {
      console.log('error is ', error)
    });

  }

  AddCategory() {
    this._adminCategory.AddCategory(this.categoryData).subscribe(response => {
      var result = Object.keys(response).map(function (key) {
        return [Number(key), response[key]];
      });
      this.rowData = result[1][1];
      console.log("response is", this.rowData)
    }, (error) => {
      console.log('error is ', error)
    })
  } 

  AddSubCategory() {
    console.log('subCategoryData-',this.subCategoryData);
    this._adminCategory.AddSubCategory(this.subCategoryData)
      .subscribe((res) => {
        console.log('Response body---', res);
      },
        (error) => {
          console.log(error);
        })
  }
  
  myCellRenderer (params) 
  {
    var eDiv = document.createElement('div');
    eDiv.innerHTML = "&nbsp; <span style='cursor:pointer;' title='Edit Record'><img class='editIcon' src='src/assets/icons/edit.png'   userId='' /></span>";
    var domElement = document.createElement("span");

    var eButton = eDiv.querySelectorAll('.editIcon')[0];   
        eButton.addEventListener('click', function() 
        {
            console.log('button was clicked!!',params);
        });
    return eDiv;
  }

  columnDefs = [
    { headerName:'Edit',field:'',  cellRenderer: this.myCellRenderer},
    { headerName: 'CATEGORY_ID', field: 'CATEGORY_ID', sortable: true, filter: true },
    { headerName: 'CATEGORY_NAME', field: 'CATEGORY_NAME' }
  ];

  columnDefSubCat = [
    { headerName:'Edit',field:'',  cellRenderer: this.myCellRenderer},
    { headerName: 'CATEGORY_ID', field: 'CATEGORY_ID', sortable: true, filter: true },
    { headerName: 'SUBCATEGORY_NAME', field: 'SUBCAT_NAME' },
    { headerName: 'SUBCATEGORY_ID', field: 'SUBCATEGORY_ID', sortable: true, filter: true },
    { headerName: 'SUBCATEGORY_DESC', field: 'SUBCAT_DESC' }
  ];

}
