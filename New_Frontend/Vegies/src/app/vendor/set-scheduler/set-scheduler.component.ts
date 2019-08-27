import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { configurationwizard } from '../configuration/configurationwizard.service'
import { LoginService } from '../../login/login.service'
import { setScheduler } from './set-scheduler.service'
import { GridComponent, CommandModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids'
import { Inject } from '@angular/core'
import { configList } from '../dashboard/configList.service'
import { SetAddressComponent } from '../set-address/set-address.component'
import { setAddress } from '../set-address/set-address.service'
import { ToastrService } from 'ngx-toastr'

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
  public commands: CommandModel[];
  public editSettings: EditSettingsModel;
  public vendorAddress: any;
  public fields: Object = { text: 'address', value: '_id' };
  public schedulerFromDate:any;
  public schedulerToDate:any;
  @ViewChild('grid', { static: true }) public grid: GridComponent;
  @ViewChild('select', { static: true }) select;
  constructor(public dialog: MatDialog, private _addProductList: configurationwizard, private _login: LoginService, private _setScheduler: setScheduler, @Inject(MAT_DIALOG_DATA) public scheduleData: any, private _setAddress: setAddress,private _toastr:ToastrService) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    })
  }
  ngOnInit() {
    this.data = this.scheduleData.scheduleData;
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: false, pageSize: 5 };

    setTimeout(() => {
      this._setAddress.getAddressList(this.userDetails).subscribe((response) => {
        this.vendorAddress = response;
        this.vendorAddress = this.vendorAddress.map((val: any) => {
          return ({ "address": val.address, "_id": val._id })
        })
        this.select.refresh();
        console.log("addssssssss1111", this.uniqueAddress);
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000)

    // this._addProductList.GetAddedProductList().subscribe((response) => {
    //   this.orderedPro = response;
    //   this.uniqueAddress = [...new Set(this.orderedPro.map((i: any) => {
    //     return i.address
    //   }))]
    // }, (error) => {
    //   console.log('error is ', error)
    // });
  }

    addScheduler(){
    console.log("hiiiiiiiiiiiii",this.data);
    this.data.map((ele:any)=>{
      ele.schedulerFromDate=this.schedulerFromDate,
      ele.schedulerToDate=this.schedulerToDate,
      ele.address=this.uniqueAddress,
      ele.scheduleDate=new Date()
    })
    console.log("scheduleDataaaaaaa",this.data)
    this._setScheduler.addScheduler(this.data).subscribe((res) => {
      this._toastr.success(res.status)
    }, (error) => {
      console.log('error is ', error)
    })
    }

    removeScheduler(x, y) {
    if (confirm("Are You Sure To Delete this Informations ?")) {
      this.data = this.data.filter((idx: any) => {
        if (idx._id != y) {
          return idx;
        }
      })
      this.grid.refresh();
    }
  }
  onChangeFrom(args) {
    this.schedulerFromDate=args.value;
    console.log("selected datesssss",args.value)
  }
  onChangeTo(args) {
    this.schedulerToDate=args.value;
    console.log("selected datesssss",args.value)
  }

  changeAddress() {
    let dialogRef  = this.dialog.open(SetAddressComponent, { disableClose: true })
    dialogRef.afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      })
  }
  closeModal() {
    this.dialog.closeAll();
  }
  getAddress(event) {
    this.uniqueAddress = event.value;
    console.log("addressssssssss", event.value)
  }
}
