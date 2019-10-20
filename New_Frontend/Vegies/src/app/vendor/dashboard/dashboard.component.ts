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
  public configDataCount: any;
  public monthlyOrderCount: any;
  public monthlyData: any = [];
  public finalData: any;
  public configData:any;
  items: Array<any> = [];
  public monthlyExpenCount = 0;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private _vendorDetails: AdminCategoryService, public _configList: configList, public _login: LoginService) {
    this.userDetails = this.route.snapshot.data['userData'];
    var da = this.route.snapshot.data['list'];
    
  }
  ngOnInit() {
    this._configList.getOrderList(this.userDetails).subscribe((response) => {
      this.data = response;
      var currentDate = new Date().toString().split(" ")[1] + "-" + new Date().toString().split(" ")[3]
      this.data.filter((da) => {
        var date = new Date(da.bookingDate);
      })
      var obj = [];
      const unique = [...new Set(this.data.map(item => item.bookingDate))];
      function search(nameKey, myArray) {
        var mrpPrice = 0;
        var actPrice = 0;
        var perAvg = 0;
        obj = [];
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].bookingDate === nameKey) {
            mrpPrice = mrpPrice + Number(myArray[i].oldPrice);
            actPrice = actPrice + Number(myArray[i].newPrice);
            perAvg = perAvg + Number(myArray[i].discount);
            myArray[i].oldPrice = Number(mrpPrice).toFixed(2);
            myArray[i].newPrice = Number(actPrice).toFixed(2);
            myArray[i].discount = Number(perAvg).toFixed(2)
            obj.push(myArray[i]);
          }
        }
        return obj;
      }
      this.finalData = unique.map((x) => {
        var test = search(x, this.data);
        var cnt = test[test.length - 1]["discount"] / test.length
        test[test.length - 1]["discount"] = Number(cnt).toFixed(2)
        test[test.length - 1]["count"] = test.length
        return test[test.length - 1];
      });

      this.finalData.filter((da) => {
        var date = new Date(da.bookingDate);
        var monYear = (date.toString().split(" ")[1] + "-" + date.toString().split(" ")[3])
        if (monYear == currentDate) {
          this.monthlyData.push(da);
        }
      })
      var expenseSum = 0;
      this.monthlyData.map((monthly) => {
        expenseSum = expenseSum + Number(monthly.newPrice);
      })
      var daysCount = new Date(new Date().getMonth() + 1, new Date().getFullYear(), 0).getDate();
      this.monthlyExpenCount = Number(parseFloat((expenseSum / Number(daysCount)).toString()).toFixed(2));
      this.monthlyOrderCount = (parseFloat((this.monthlyData.length / Number(daysCount)).toString()).toFixed(2)) ? parseFloat((this.monthlyData.length / Number(daysCount)).toString()).toFixed(2) : "0";


      this._configList.getProductList(this.userDetails).subscribe((response) => {
        console.log('error is ')
        this.configData = response;
        this.configDataCount = (!this.configData) ? "0" : this.configData.length < 10 ? "0" + this.configData.length : this.configData.length;
        console.log("this.data.length is", this.configData.length)
        if (this.configData.length <= 0) {
          this.dialog.open(ConfigurationComponent, {
            disableClose: true, data: {
              "userDetails": this.userDetails
            }
          });
        }
      }, (error) => {
        console.log('error is ', error)
      });
     

    }, (error) => {
      console.log('error is ', error)
    });


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
  }

}
