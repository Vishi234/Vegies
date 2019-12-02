import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { AdminCategoryService } from '../category/admin-category.service';
import {Router} from '@angular/router';
import {EditSettingsModel,DialogEditEventArgs,ToolbarItems,SaveEventArgs}  from '@syncfusion/ej2-angular-grids';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  public pageSettings: object;
  public orderForm: FormGroup;
  public statusDDL: any;

  constructor(public dialog: MatDialog,private _adminCategory: AdminCategoryService,private _router:Router,private _toastr: ToastrService) { }

  ngOnInit() 
  {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Edit', 'Update','Cancel'];

    this.statusDDL=[{'id':'Active','value':'Active'},{'id':'InActive','value':'InActive'}];
    

    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this._adminCategory.GetCategoryList().subscribe((response) => {
      this.data = response;
      this.data.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias,"status":val.status })
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
      status: new FormControl(data1.status, Validators.required),
      _id:new FormControl(data1._id,Validators.required),
      
  });
}

actionBegin(args: SaveEventArgs): void 
{
  if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.orderForm = this.createFormGroup(args.rowData);
  }
  if(args.action=='add')
  {
      args.data = this.orderForm.value;
      console.log("daaaa",args.data)    
      this._adminCategory.AddCategory(args.data).subscribe(response => 
      {
        if(response.status){
          this._toastr.success(response.status);
        }else{
          this._toastr.error(response.status);
        }
      }, (error) => {
        //this._toastr.success(error.error.text);
        console.log('error is ', error)
      });
  }
  else if(args.action=="edit")
   {
      args.data = this.orderForm.value;
      console.log("daaaa",args.data)    
      this._adminCategory.UpdateCategory(args.data).subscribe(response => {
        if(response.status){
          this._toastr.success(response.status);
        }else{
          this._toastr.error(response.status);
        }
       }, (error) => {
        console.log('error is ', error)
       })
  }
  
}

// actionComplete(args: DialogEditEventArgs): void {
//   if (args.requestType === 'beginEdit' || args.requestType === 'add') {
//       // Set initail Focus
//       if (args.requestType === 'beginEdit') {
//           (args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
//       } else if (args.requestType === 'add') {
//           (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
//       }
//   }
// }
}
 
export interface IOrderModel {
  catName?: string;
  catAlias?: string;
  status?:string;
  _id?:string;
}
