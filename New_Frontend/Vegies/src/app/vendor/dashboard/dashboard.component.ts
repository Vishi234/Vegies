import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { ConfigurationComponent } from '../configuration/configuration.component'
import { ActivatedRoute } from '@angular/router'
import { AdminCategoryService } from '../../admin/category/admin-category.service'
import { configList } from './configList.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public start: Date = new Date("10-Jul-2017");
  public end: Date = new Date("11-Aug-2017");
  public data: any;
  public filterSettings: Object;
  public pageSettings: object;
  public subCatList: Array<any> = [];
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private _vendorDetails: AdminCategoryService, public _configList: configList) { }

  ngOnInit() {
    this.dialog.open(ConfigurationComponent, { disableClose: true });
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: false, pageSize: 5 };

    this._configList.getProductList().subscribe((response) => {
      this.data = response;
      console.log("data issssssssss", response)
    }, (error) => {
      console.log('error is ', error)
    });

    this._vendorDetails.GetSubCategoryList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.subCatList.push(value)
        }
      );

      this.subCatList.map((val: any) => {
        return ({ "_id": val._id, "subCatName": val.subCatName })
      })
    }, (error) => {
      console.log('error is ', error)
    });
  }



}
