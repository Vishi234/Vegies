import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { configurationwizard } from '../configuration/configurationwizard.service'
@Component({
  selector: 'app-set-scheduler',
  templateUrl: './set-scheduler.component.html',
  styleUrls: ['./set-scheduler.component.scss']
})
export class SetSchedulerComponent implements OnInit {

  constructor(public dialog: MatDialog, private _addProductList: configurationwizard) { }
  public data: any;
  public filterSettings: Object;
  public pageSettings: object;
  public startDate: Date = new Date("dd-MMM-yyyy");
  public endDate: Date = new Date("dd-MMM-yyyy");
  public uniqueAddress: any;
  ngOnInit() {

    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: false, pageSize: 5 };
    this._addProductList.GetAddedProductList().subscribe((response) => {
      this.data = response;
      this.uniqueAddress = [...new Set(this.data.map((i: any) => {
        return i.address
      }))]
    }, (error) => {
      console.log('error is ', error)
    });
  }


  closeModal() {
    this.dialog.closeAll();
  }
}
