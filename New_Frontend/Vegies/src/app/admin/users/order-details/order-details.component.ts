import { Component, OnInit,ViewChild } from '@angular/core';
import { Inject } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { configList } from '../../../vendor/dashboard/configList.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../../../login/login.service'
import { ActivatedRoute } from '@angular/router';
import {userOrderDetails} from './userOrderDetails.service'
import { GridComponent, CommandModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids'
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public filterSettings: Object;
  public pageSettings: object;
  public data: any;
  public orderSummary: any;
  public latestStatus:any;
  @ViewChild('old', { static: false }) public grid: GridComponent;
  public status: { [key: string]: Object }[] = [
    { name: "Pending", id: "0" },
    { name: "Confirmed", id: "1" },
    { name: "Dispatched", id: "2" },
    { name: "Shipped", id: "3" },
  ];
  public fields: Object = { text: 'name', value: 'id' };
  public text: string = "Select Status";
  public value: string = "0";
  public orderDate: any;
  public userDetails: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public orderDetails: any, private route: ActivatedRoute, private _configList: configList, private _toastr: ToastrService, private _login: LoginService,private _userOrderDetails:userOrderDetails) {
    console.log("second")
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    })
  }

  ngOnInit() {
    console.log("first");
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    setTimeout((a) => {
      this._configList.getOrderList(this.userDetails).subscribe((response) => {
        this.data = response;
        this.orderSummary = this.data.filter((x) => {
          if (x.orderId == this.orderDetails.orderId) {
            return x;
          }
        })
      })
    }, 1000)
  }
  updateStatus() {
    var details:any;
    details={"status":this.latestStatus,"orderId":this.orderDetails.orderId};
    console.log("kkkkkkk",details)
    this._userOrderDetails.updateStatus(details).subscribe((res) => {
      if(res.successMsg){
        this._toastr.success(res.successMsg)
        this.grid.refresh();
      }
    }, (error) => {
      console.log('error is ', error)
    })
  }
  getStatus(event) {
    this.latestStatus=event.itemData.name;
    console.log("valllll")
  }
  Close() {
    this.dialog.closeAll();
  }
}
