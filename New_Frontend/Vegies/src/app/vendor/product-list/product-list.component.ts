import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AdminCategoryService } from '../../admin/category/admin-category.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit
{

  public catList: Array<any> = [];
  public subCatList: Array<any> = [];
  public productList: Array<any> = [];
  constructor(private _categoryList: AdminCategoryService){}
  

  ngOnInit() 
  {
   // debugger;
    this._categoryList.GetCategoryList().subscribe((response) => 
    {
     // debugger;
      this.catList.push({_id: '0', catName: 'Select Category'})
      Object.entries(response).forEach(
        ([key, value]) =>
         {
          this.catList.push(value);
        //  console.log(this.catList);
        }
      );
     }, (error) => {
      console.log('error is ', error)
    });

    this._categoryList.GetSubCategoryList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.subCatList.push(value)
        }
      );
    }, (error) => {
      console.log('error is ', error)
    });

    this._categoryList.GetProductList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          console.log('this.productList',this.productList);
          this.productList.push(value)
        }
      );
     }, (error) => {
      console.log('error is ', error)
    });

  }
    @ViewChild('catList', { static: true })
  public catObj: DropDownListComponent;

  @ViewChild('proList', { static: true })
  public proObj: AutoCompleteComponent;
  // define the JSON of data

  public catData: Object[] = this.catList;
  public subCatData: Object[] = this.subCatList;
  public productData: Object[] = this.productList;
  public allProduct: Object[] = this.productList;

  // maps the appropriate column to fields property
  public catfields: Object = { text: 'catName', value: '_id' };
  public subCatFields: Object = { text: 'subCatName', value: '_id' };
  public productFields: Object = { text: 'productName', value: '_id' };
  public value: string = '0';
//  public text: string = 'Select Category';

onCategoryChange(event)
{

  var getSelectedSubCat = this.subCatData.filter(function (item) 
  {
   // if (item._id == event.itemData._id) {  return true; }
  });
  this.subCatData=getSelectedSubCat;
 
  this.allProduct=this.allProduct.filter(function (item) 
  {
   // if (item._id == event.itemData._id) {  return true; }
  });

}
onSubCatChange(event)
{
  var getSelectedProduct = this.productData.filter(function (item) 
  {
  //  if (item._id == event.itemData._id) { return true;  }
  });
  this.productData=getSelectedProduct;

  this.allProduct=this.allProduct.filter(function (item) 
  {
   // if (item._id == event.itemData._id) {  return true; }
  });
}
onProductChange(event)
{

  this.allProduct=this.allProduct.filter(function (item) 
  {
  //  if (item._id == event.itemData._id) {  return true; }
  });

}
  // define the JSON of data
  public proNameData: Object[] = [
    { key: 'Game1', value: 'American Football' },
    { key: 'Game2', value: 'Badminton' },
    { key: 'Game3', value: 'Basketball' },
    { key: 'Game4', value: 'Cricket' },
    { key: 'Game5', value: 'Football' },
    { key: 'Game6', value: 'Golf' },
    { key: 'Game7', value: 'Hockey' },
    { key: 'Game8', value: 'Rugby' },
    { key: 'Game9', value: 'Snooker' },
    { key: 'Game10', value: 'Tennis' }
  ];
  // maps the appropriate column to fields property
  public profields: Object = { value: 'value' };
  public proWaterMark: string = 'Start typing...';
  public onProChange(args: any): void {
    let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
    // make empty the input value when typed characters is 'null' in input element
    if (this.proObj.value === "null" || this.proObj.value === null || this.proObj.value === "") {
      valueEle.value = '';
    }
  }
}
