import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { configurationwizard } from '../configuration/configurationwizard.service'
import { LoginService } from '../../login/login.service'
import { setScheduler } from './set-scheduler.service'
import { GridComponent } from '@syncfusion/ej2-angular-grids'
import { Inject } from '@angular/core'
import { configList } from '../dashboard/configList.service'
import { SetAddressComponent } from '../set-address/set-address.component'
@Component({
  selector: 'app-set-scheduler',
  templateUrl: './set-scheduler.component.html',
  styleUrls: ['./set-scheduler.component.scss']
})
export class SetSchedulerComponent implements OnInit {
  public data: any;
  public filterSettings: Object;
  public pageSettings: object;
  public startDate: Date = new Date("dd-MMM-yyyy");
  public endDate: Date = new Date("dd-MMM-yyyy");
  public uniqueAddress: any;
  public userDetails: any;
  public orderedPro: any;
  @ViewChild('grid', { static: true }) public grid: GridComponent;
  constructor(public dialog: MatDialog, private _addProductList: configurationwizard, private _login: LoginService, private _setScheduler: setScheduler, @Inject(MAT_DIALOG_DATA) public scheduleData: any) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    })
  }
  ngOnInit() {
    console.log(this.scheduleData.scheduleData, "00000000000---------")
    this.data = this.scheduleData.scheduleData;
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: false, pageSize: 5 };

    // setTimeout(() => {
    //   console.log("fffff", this.userDetails)
    //   this._setScheduler.getScheduleList(this.userDetails).subscribe((response) => {
    //     console.log("]]]]]]]]]]]]]]]]",response)
    //     this.data = response;
    //   }, (error) => {
    //     console.log('error is ', error)
    //   });
    // }, 1000)

    // this._addProductList.GetAddedProductList().subscribe((response) => {
    //   this.orderedPro = response;
    //   this.uniqueAddress = [...new Set(this.orderedPro.map((i: any) => {
    //     return i.address
    //   }))]
    // }, (error) => {
    //   console.log('error is ', error)
    // });
  }

  removeScheduler(x,y) {
    var selectedRow = this.grid.getSelectedRowIndexes()[0];
    var table = document.getElementsByTagName("table");
    table[3].children[1].children[selectedRow].remove();
  }

  changeAddress() {
    this.dialog.open(SetAddressComponent, { disableClose: true })
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
