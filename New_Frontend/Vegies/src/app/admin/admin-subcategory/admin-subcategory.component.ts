import { Component, OnInit } from '@angular/core';
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
  selector: 'app-admin-subcategory',
  templateUrl: './admin-subcategory.component.html',
  styleUrls: ['./admin-subcategory.component.scss']
})
export class AdminSubcategoryComponent implements OnInit {

  public data: any;
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
  public ActiveDDL:any;
  public testImage:any;

  constructor(public dialog: MatDialog, private _adminCategory: AdminCategoryService, private _router: Router,private _toastr: ToastrService) { }

  ngOnInit() {

    this.ActiveDDL=[{'id':'Active','value':'Active'},{'id':'InActive','value':'InActive'}];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Edit',  'Update', 'Cancel'];
    this.pageSettings = { pageSizes: true, pageSize: 10 };

    this._adminCategory.GetCategoryList().subscribe((response) => 
    {
      this.data = response;
      this.data.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias })
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
        return ({ "_id": val._id,"catName":val.catName, "subCatName": val.subCatName, "subCatAlias": val.subCatName, "status": val.status })
      });
      this.subCategoryData = this.subCategoryData;
     // this.subCategoryList=response;

    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse, "00", error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {

          this._router.navigate(['/'])
        }
      }
    });
   }

  createFormGroup(data1: IOrderModel): FormGroup {
    return new FormGroup({
        catName: new FormControl(data1.catName, Validators.required),
        subCatName: new FormControl(data1.subCatName, Validators.required),
        subCatAlias: new FormControl(data1.subCatAlias, Validators.required),
        status: new FormControl(data1.status, Validators.required),
        imageUrl: new FormControl(data1.imageUrl, Validators.required),
        _id:new FormControl(data1._id, Validators.required),
    });
  }


  actionBegin(args: SaveEventArgs): void 
  {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        this.orderForm = this.createFormGroup(args.rowData);
    }
    var imgName=this.testImage;
    var lastIndex=imgName.lastIndexOf("\\");
    this.orderForm.value.imageUrl=imgName.substr(lastIndex+1,imgName.length);
    if(args.action=='add')
    {
            args.data = this.orderForm.value;
            console.log("daaaa",args.data)    
            this._adminCategory.AddSubCategory(args.data).subscribe(response => {
            if(response.status){
              this._toastr.success(response.status);
            }else{
              this._toastr.error(response.status);
            }
            }, (error) => {
              this._toastr.success(error.error.text);
              console.log('error is ', error)
            });
       
    }
    else if(args.action=="edit")
     {
      if (this.orderForm.valid) 
      {
        args.data = this.orderForm.value;
        console.log("daaaa",args.data)    
        this._adminCategory.UpdateSubCategory(args.data).subscribe(response => {
          if(response.status){
            this._toastr.success(response.status);
          }else{
            this._toastr.error(response.status);
          }
         }, (error) => {
               console.log('error is ', error)
         })
  
     } else {
        args.cancel = true;
    }
    } 
  }
  
  actionComplete(args: DialogEditEventArgs): void 
  {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        // Set initail Focus
        if (args.requestType === 'beginEdit') {
            (args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
        } else if (args.requestType === 'add') {
            (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
        }
    }
  }
}
export interface IOrderModel 
{
  catName?: string;
  subCatName?:string;
  subCatAlias?: string;
  status?: number; 
  imageUrl?:string;
  _id?:string;
}
