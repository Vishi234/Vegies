import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { AdminCategoryService } from '../category/admin-category.service';
import {Router} from '@angular/router';
import {EditSettingsModel,DialogEditEventArgs,ToolbarItems,SaveEventArgs}  from '@syncfusion/ej2-angular-grids';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})

export class AdminCategoryComponent implements OnInit {

  public data: any;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public categorydata: any;
  public subcategorydata:any;
  //public catData: Array<any> = [];
  //public filterSettings: Object;
  public pageSettings: object;
  public orderForm: FormGroup;

  constructor(public dialog: MatDialog,private _adminCategory: AdminCategoryService,private _router:Router) { }

  ngOnInit() 
  {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Edit', 'Delete','Update'];

    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this._adminCategory.GetCategoryList().subscribe((response) => {
      this.data = response;
      this.data.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias,"Active":val.Active })
      });
      this.categorydata=this.data;

    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse,"00",error);
      if(error instanceof HttpErrorResponse){
        if(error.status===401){

          this._router.navigate(['/'])
        }
      }
    });
}

createFormGroup(data1: IOrderModel): FormGroup {
  return new FormGroup({
      catName: new FormControl(data1.catName, Validators.required),
      catAlias: new FormControl(data1.catAlias, Validators.required),
      Active: new FormControl(data1.Active, Validators.required),
  
  });
}

actionBegin(args: SaveEventArgs): void {
  debugger;
  if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.orderForm = this.createFormGroup(args.rowData);
  }
  if (args.requestType === 'save') {
      if (this.orderForm.valid) {
          args.data = this.orderForm.value;
         // var myArr = JSON.parse(args.data);
        
          console.log("daaaa",args.data)
          
//console.log("fffffff",)
          this._adminCategory.AddCategory(args.data).subscribe(response => {
            console.log("Response is",response);
          }, (error) => {
            console.log('error is ', error)
          })

      } else {
          args.cancel = true;
      }
  }
}

actionComplete(args: DialogEditEventArgs): void {
  debugger;
  if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
          (args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
          (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
      }
  }
}



public focusIn(target: HTMLElement): void {
  target.parentElement.classList.add('e-input-focus');
}

public focusOut(target: HTMLElement): void {
  target.parentElement.classList.remove('e-input-focus');
}

// get OrderID(): AbstractControl  { return this.orderForm.get('OrderID'); }

// get CustomerID(): AbstractControl { return this.orderForm.get('CustomerID'); }

}
 
export interface IOrderModel {
  catName?: string;
  catAlias?: string;
  Active?: number;
  
}
