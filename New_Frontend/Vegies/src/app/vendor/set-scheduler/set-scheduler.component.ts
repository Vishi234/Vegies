import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { configurationwizard } from '../configuration/configurationwizard.service'
import { LoginService } from '../../login/login.service'
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

  constructor(public dialog: MatDialog, private _addProductList: configurationwizard, private _login: LoginService, private _configList: configList) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    }
    )
  }
  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: false, pageSize: 5 };

    setTimeout(() => {
      console.log("fffff", this.userDetails)
      this._configList.getProductList(this.userDetails).subscribe((response) => {
        this.data = response;
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000)

    this._addProductList.GetAddedProductList().subscribe((response) => {
      this.orderedPro = response;
      this.uniqueAddress = [...new Set(this.orderedPro.map((i: any) => {
        return i.address
      }))]
    }, (error) => {
      console.log('error is ', error)
    });
  }

  changeAddress() {
    this.dialog.open(SetAddressComponent, { disableClose: true })
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
