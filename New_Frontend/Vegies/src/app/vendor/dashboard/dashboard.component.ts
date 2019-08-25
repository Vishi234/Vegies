import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { ConfigurationComponent } from '../configuration/configuration.component'
import { ActivatedRoute } from '@angular/router'
import { AdminCategoryService } from '../../admin/category/admin-category.service'
import { configList } from './configList.service'
import { LoginService } from '../../login/login.service'

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
  public currentLogged: any;
  public userDetails: any;
  items: Array<any> = [];
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private _vendorDetails: AdminCategoryService, public _configList: configList, public _login: LoginService) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
    }
    )
  }
  ngOnInit() {
    setTimeout(() => {
      this._configList.getProductList(this.userDetails).subscribe((response) => {
        this.data = response;
        console.log("consgigureList isss", this.data.length)
        if (this.data.length <= 0) {
          console.log("dataaa us", this.data)
          this.dialog.open(ConfigurationComponent, { disableClose: true });
        }
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000);

    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: false, pageSize: 5 };

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
    this.items.push(
      {
        "name": "dasdasd"
      },
      {
        "name": "dasdasd"
      },
      {
        "name": "dasdasd"
      },
      {
        "name": "dasdasd"
      },
      {
        "name": "dasdasd"
      },
      {
        "name": "dasdasd"
      },
      {
        "name": "dasdasd"
      },
      {
        "name": "dasdasd"
      }
    )
  }
}
