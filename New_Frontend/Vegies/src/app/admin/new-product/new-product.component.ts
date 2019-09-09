import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewSubcategoryComponent } from '../new-subcategory/new-subcategory.component'
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AdminCategoryService } from '../category/admin-category.service';
import { Router } from '@angular/router';
import { EditSettingsModel, DialogEditEventArgs, ToolbarItems, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  public data: any;
  public productData: any;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public categorydata: any;
  public subCategoryData: any;
  public subCategoryList: any;
  //public catData: Array<any> = [];
  //public filterSettings: Object;
  public pageSettings: object;
  public orderForm: FormGroup;
  public countryElem: HTMLElement;
  public countryObj: DropDownList;
  public stateElem: HTMLElement;
  public stateObj: DropDownList;
  public actPrice="";
  @ViewChild('form', { static: true }) public form;
  constructor(public dialog: MatDialog, private _adminCategory: AdminCategoryService, private _router: Router,private _toastr: ToastrService) { }

  ngOnInit() {

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.pageSettings = { pageSizes: true, pageSize: 10 };

    this._adminCategory.GetProductList().subscribe((response) => {
      this.productData = response;
      this.productData.map((val: any) =>
       {
        return ({ "_id": val._id, "catName": val.catName, "subCatName": val.subCatName, "product": val.product,
        "productAlias":val.productAlias,"price":val.price,"discount":val.discount,"actualPrice":val.actualPrice,
        "active":val.active,"imageUrl":val.imageUrl});
      });
      console.log( "  this.productData ", this.productData );
    //  this.productData = this.data;

    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse, "00", error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {

          this._router.navigate(['/'])
        }
      }
    });

    this._adminCategory.GetCategoryList().subscribe((response) => {
      this.data = response;
      this.data.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias, "Active": val.Active })
      });
      this.categorydata = this.data;

    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse, "00", error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {

          this._router.navigate(['/'])
        }
      }
    });
    this._adminCategory.GetSubCategoryList().subscribe((response) => {
      this.subCategoryData = response;
      this.subCategoryData.map((val: any) => {
        return ({ "_id": val._id,"catName":val.catName, "subCatName": val.subCatName, "subCatAlias": val.subCatName, "Active": val.Active })
      });
      this.subCategoryData = this.subCategoryData;
      this.subCategoryList=response;

    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse, "00", error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {

          this._router.navigate(['/'])
        }
      }
    });

    this.categorydata = {
      create: () => {
          this.countryElem = document.createElement('input');
          return this.countryElem;
      },
      read: () => {
          return this.countryObj.text;
      },
      destroy: () => {
          this.countryObj.destroy();
      },
      write: () => {
          this.countryObj = new DropDownList({
              dataSource: new DataManager(this.categorydata),
              fields: { value: 'catName', text: 'catName' },
              change: () => {
                  this.subCategoryData.enabled = true;
                  const tempQuery: Query = new Query().where('catName', 'equal', this.countryObj.value);
                  this.subCategoryData.query = tempQuery;
                  this.subCategoryData.text = null;
                  this.subCategoryData.dataBind();
              },
              placeholder: 'Select a Category',
              floatLabelType: 'Never'
          });
          this.countryObj.appendTo(this.countryElem);
      }
    };
   this.subCategoryData = {
    create: () => {
        this.stateElem = document.createElement('input');
        return this.stateElem;
    },
    read: () => {
        return this.stateObj.text;
    },
    destroy: () => {
        this.stateObj.destroy();
    },
    write: () => {
        this.stateObj = new DropDownList({
            dataSource: new DataManager(this.subCategoryData),
            fields: { value: 'subCatName', text: 'subCatName' },
            enabled: false,
            placeholder: 'Select a SubCategory',
            floatLabelType: 'Never'
        });
        this.stateObj.appendTo(this.stateElem);
    }
    };


  
  }

  onChangeCategroy(evt)
  {
    this.subCategoryList=  this.subCategoryData.filter(function(data)
    {
      return data.catName == evt.itemData.catName;
    });
  }

  createFormGroup(data1: IOrderModel): FormGroup {
    return new FormGroup({
        catName: new FormControl(data1.catName, Validators.required),
        subCatName: new FormControl(data1.subCatName, Validators.required),
        product: new FormControl(data1.product, Validators.required),
        productAlias: new FormControl(data1.productAlias, Validators.required),
        price: new FormControl(data1.price, Validators.required),
        discount: new FormControl(data1.discount, Validators.required),
        actualPrice: new FormControl(data1.actualPrice, Validators.required),
        imageUrl: new FormControl("test", Validators.required),
        active: new FormControl(data1.active, Validators.required),
        _id:new FormControl(data1._id, Validators.required),
    });
  }


  actionBegin(args: SaveEventArgs): void 
  {
    debugger;
    if (args.requestType === 'beginEdit' || args.requestType === 'add')
    {
        this.orderForm = this.createFormGroup(args.rowData);
    }
    if(args.action=='add')
    {
      debugger;
      this.orderForm.value.actualPrice=(this.actPrice)?this.actPrice:0;
    //  this.orderForm.value
        // if (this.orderForm.valid) 
        // {
            args.data = this.orderForm.value;
            console.log("daaaa",args.data)    
            this._adminCategory.AddProduct(args.data).subscribe(response => {
              console.log("Response is",response);
            }, (error) => {
              console.log('error is ', error)
            });
        // } else {
        //     args.cancel = true;
        // }
    }
    else if(args.action=="edit")
     {
      // if (this.orderForm.valid) 
      // {
        debugger;
        args.data = this.orderForm.value;
        console.log("daaaa",args.data)    
        this._adminCategory.UpdateProduct(args.data).subscribe(response => {
          this._toastr.success(response.status);
         }, (error) => {
          console.log('error is ', error)
         })
  
    //  } else {
    //     args.cancel = true;
    // }
    } 
  }
  
  actionComplete(args: DialogEditEventArgs): void 
  {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') 
    {
        // Set initail Focus
        if (args.requestType === 'beginEdit') {
            (args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
        } else if (args.requestType === 'add') {
            (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
        }
    }
  }

  onChangeDiscount(e)
  {
   debugger;
   var dd=e.target.value;
   var totalPrice=  e.target.parentElement.parentElement.previousSibling.children[0].children[0].value;
    e.target.parentElement.parentElement.nextSibling.children[0].children[0].value=totalPrice-(totalPrice*dd)/100;
   this.actPrice= e.target.parentElement.parentElement.nextSibling.children[0].children[0].value
  }
  // submitForm(e){
  //   alert(1);
  //   e.preventDefault();
  // }
}
export interface IOrderModel 
{
  catName?: string;
  subCatName?:string;
  product?:string;
  productAlias?:string,
  price?:string,
  discount?:string,
  actualPrice?:string,
  imageUrl?: string;
  active?: number; 
  _id?:string;


}

