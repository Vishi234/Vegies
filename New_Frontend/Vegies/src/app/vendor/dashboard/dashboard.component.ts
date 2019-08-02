import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { ConfigurationComponent } from '../configuration/configuration.component'
import {ActivatedRoute} from '@angular/router'
import { AdminCategoryService } from '../../admin/category/admin-category.service'
import {configList} from './configList.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public start: Date = new Date("10-Jul-2017");
  public end: Date = new Date("11-Aug-2017");
  public data: Object[];
  public filterSettings: Object;
  public pageSettings: object;
  constructor(public dialog: MatDialog,private route: ActivatedRoute,private _vendorDetails: AdminCategoryService, public _configList:configList) { }

  ngOnInit() {
    this.dialog.open(ConfigurationComponent, { disableClose: true });
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 5 };
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

    this._configList.getProductList().subscribe((response) => 
    {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.data=[{"productName":value.name,"unitPrice":value.newPrice,"totalPrice":value.oldPrice,"productId":0,"discount":value.discount,"unitMeasure":value.unitMeasure,qty:value.Qnty}]
          console.log("productttttttttt",this.data)
        }
      );
      }, (error) => {
      console.log('error is ', error)
      });
  }

  

}
