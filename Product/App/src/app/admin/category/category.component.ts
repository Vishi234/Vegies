import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from './admin-category.service'
import { categoryFields } from './categoryFields';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router'

import { BrowserModule }  from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private _adminCategory: AdminCategoryService,private _router:Router) { }


  categoryData = new categoryFields(0, '', '', 1);
  subCategoryData={};
  productData={};
  catResponse: any;
  catName: any;
  public catData: Array<any> = [];
  public subCatData: Array<any> = [];
  rowDatSubCat: any;
  categoryList: any;
  subCatList:any;
  rowDataProduct:any;
  files: any[];
  actualPrice:any;



  selectedFile: File = null;
  fd = new FormData();
  oper=true;
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

    this._adminCategory.GetProductList().subscribe((response) => 
    {
      this.rowDataProduct = response;
      }, (error) => {
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
  AddProduct() 
  {

   // console.log('productDetails-',this.productData);
    if(this.oper)
    {
    this._adminCategory.AddProduct(this.productData)
      .subscribe((res) => {
        console.log('Response body---', res);
      },
        (error) => {
          console.log(error);
        });
      }
      else{
        this._adminCategory.UpdateProduct(this.productData)
        .subscribe((res) => {
          console.log('Response body---', res);
        },
          (error) => {
            console.log(error);
          });
      }
  }
  selectedSubCatList= []; 

  categoryChange(e){

    let selectedVal=e.value;
    this.subCatList.filter(element => 
      {
      if(element.mainProduct ==selectedVal)
      {
        this.selectedSubCatList = element;
      }
    });
  }


  url: any;
  onSelectFile(event) { // called each time file input changes
    debugger;

   // this.selectedFile = <File>event.target.files[0];
   // this.fd.append('file', this.selectedFile, this.selectedFile.name);
    
    this.files = event.target.files;
    for (const file of this.files) 
      {
      this.fd.append('file', file, file.name);
       }

      if (event.target.files && event.target.files[0]) 
      {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url     
        this.files = event.target.files;
        reader.onload = (event) => { // called once readAsDataURL is completed
        this.url=event.target['result'];
        this.onUpload();     
         }
      }
  }

  onChangeDiscount(e)
  {
    var dd=e.target.value;
    var totalPrice=  this.productData["price"];  
    this.productData["actualPrice"]=totalPrice-(totalPrice*dd)/100;
  }

  onUpload() 
  {
    this._adminCategory.AddProductImages(this.fd,this.productData["catName"])
    .subscribe((res) => {
      console.log('Response body---', res);
    },
      (error) => {
        console.log(error);
      });
  }

  
  myCellRenderer(params) 
  {
    var eDiv = document.createElement('div');
    eDiv.innerHTML = "&nbsp; <span style='cursor:pointer;' title='Edit Record'><img class='editIcon' src='src/assets/icons/edit.png'   userId='' /></span>";
    var domElement = document.createElement("span");

    var eButton = eDiv.querySelectorAll('.editIcon')[0];
    eButton.addEventListener('click', function () 
    {
      console.log('button was clicked!!', params);
    });
    return eDiv;
  }

  productCellRenderer(params) {
    var eDiv = document.createElement('div');
    eDiv.innerHTML = "&nbsp; <span style='cursor:pointer;' title='Edit Record'><img class='editIcon' src='src/assets/icons/edit.png'   userId='' /></span>";
    var domElement = document.createElement("span");

    var eButton = eDiv.querySelectorAll('.editIcon')[0];
    eButton.addEventListener('click', function () 
    {
      console.log('button was clicked!!', params);
      debugger;
      this.oper=false;
      this.productData=
      {
        catName : params.data.catName,
        unitMeasure:params.data.unitMeasure,
        productName:params.data.productName,
        productAlias:params.data.productAlias,
        price:params.data.price,
        discount:params.data.discount,
        active:params.data.active
      }
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

   columnDefProduct = [
    { headerName: 'Edit', field: '', cellRenderer: this.productCellRenderer },
    { headerName: 'Category Name', field: 'catName', sortable: true, filter: true },
    { headerName: 'SubCategory Name', field: 'subCatName' },
    { headerName: 'Product Name', field: 'productName' },
    { headerName: 'Product Alias', field: 'productAlias' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Discount', field: 'discount' }
  ];
}
