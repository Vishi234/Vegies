import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { AdminCategoryService } from '../category/admin-category.service';
import {Router} from '@angular/router';
import {EditSettingsModel,ToolbarItems}  from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public editOptions:EditSettingsModel={allowAdding:true,allowEditing:true,allowDeleting:true,mode:'Normal'};
  public toolbarOptions:ToolbarItems[]=['Add','Edit','Delete','Update','Cancel'];
  
  public data: any;
  //public catData: Array<any> = [];
  public filterSettings: Object;
  public pageSettings: object;
  constructor(public dialog: MatDialog,private _adminCategory: AdminCategoryService,private _router:Router) { }

  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };

    console.log('-------------->',this.data);
    this._adminCategory.GetCategoryList().subscribe((response) => {
      debugger;
      this.data = response;
      // Object.entries(response).forEach(
      //   ([key, value]) => {
      //     this.data.push(value);
      //   }
      // );
      this.data.map((val: any) => {
        return ({ "_id": val._id, "catName": val.catName, "catAlias": val.catAlias,"Active":val.Active })
      })
    }, (error) => {
      console.log('error is 00', error instanceof HttpErrorResponse,"00",error);
      if(error instanceof HttpErrorResponse){
        if(error.status===401){

          this._router.navigate(['/'])
        }
      }
    });


    // this.data = [
    //   { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38, ShipCountry: 'France' },
    //   { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61, ShipCountry: ' Germany' },
    //   { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83, ShipCountry: 'Brazil' },
    //   { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34, ShipCountry: 'France' },
    //   { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3, ShipCountry: 'Belgium' },
    //   { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17, ShipCountry: 'Brazil' },
    //   { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98, ShipCountry: 'Switzerland' },
    //   { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33, ShipCountry: 'Switzerland' },
    //   { OrderID: 10256, CustomerID: 'SUPRD', Freight: 13.97, ShipCountry: 'Brazil' },
    //   { OrderID: 10257, CustomerID: 'WELLI', Freight: 14.23, ShipCountry: 'Venezuela' },
    //   { OrderID: 10258, CustomerID: 'VICTE', Freight: 18.33, ShipCountry: 'France' },
    //   { OrderID: 10259, CustomerID: 'WELLI', Freight: 28.13, ShipCountry: 'Brazil' },
    //   { OrderID: 10260, CustomerID: 'CHOPS', Freight: 48.34, ShipCountry: 'Switzerland' },
    //   { OrderID: 10261, CustomerID: 'SUPRD', Freight: 32.73, ShipCountry: ' Germany' },
    //   { OrderID: 10262, CustomerID: 'TOMSP', Freight: 12.31, ShipCountry: 'Switzerland' },
    //   { OrderID: 10263, CustomerID: 'VICTE', Freight: 23.77, ShipCountry: 'Brazil' },
    //   { OrderID: 10264, CustomerID: 'SUPRD', Freight: 43.47, ShipCountry: 'Venezuela' },
    //   { OrderID: 10265, CustomerID: 'CHOPS', Freight: 53.37, ShipCountry: 'Belgium' },
    // ];
  }
  addNewCategory() {
    this.dialog.open(NewCategoryComponent, { disableClose: true })
  }
}
