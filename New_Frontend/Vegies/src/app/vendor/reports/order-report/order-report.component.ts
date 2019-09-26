import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { dataBound } from '@syncfusion/ej2-grids';
import { configList } from '../../dashboard/configList.service'
import { LoginService } from '../../../login/login.service'
import { setAddress } from '../../set-address/set-address.service'
import { GridComponent, GroupSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids'
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
declare var require: any;
import { ActivatedRoute } from '@angular/router'
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
  public currentMonth = new Date();
  public start: Date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
  public end: Date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
  public vendorOrders: any
  public vendorAddress: any
  public data: any = [];
  public userDetails: any;
  public reportData: any = [];
  public monthlyReportData: any = [];
  public filterSettings: Object;
  public pageSettings: object;
  public custom: any = true;
  public tabularData: any = [];
  public monTabularData: any;
  public uniqueAddress: any;
  public groupData: any = [];
  public toolbarOptions: ToolbarItems[];
  public groupOptions: GroupSettingsModel = { showDropArea: false, columns: ['orderId'] };
  @ViewChild('old', { static: false }) public grid: GridComponent;
  public options: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Daily Order History Graph Report'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total percent market share'
      }

    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}'
        }
      }
    },


    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name | date : "dd-MMM-yyyy"}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
    },

    series: [],

  }
  constructor(private _configList: configList, private _login: LoginService, private _setAddress: setAddress, private route: ActivatedRoute) {
    this.userDetails = this.route.snapshot.data['userData'];
  }

  ngOnInit() {
    this.toolbarOptions = ['PdfExport'];
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    //setTimeout((x) => {
    this._setAddress.getAddressList(this.userDetails).subscribe((response) => {
      this.vendorAddress = response;
      this._configList.getOrderList(this.userDetails).subscribe((res) => {
        console.log("respose issssss", res)
        this.data = res;
        var currentDate = new Date().toString().split(" ")[1] + "-" + new Date().toString().split(" ")[3]
        console.log("original data", this.data, "current", currentDate)

        console.log("tabiu", this.tabularData)
        this.grid.refresh();
        this.uniqueAddress = [...new Set(this.data.map(item => item.bookingDate))];
        this.vendorOrders = this.uniqueAddress.map((x) => {
          var test = this.search(x, this.data);
          var cnt = test[test.length - 1]["discount"] / test.length
          test[test.length - 1]["discount"] = Number(cnt).toFixed(2)
          test[test.length - 1]["count"] = test.length
          return test[test.length - 1];
        });
        this.vendorOrders.map((add) => {
          this.vendorAddress.map((ord) => {
            if (ord._id == add.address) {
              add.address = ord.address
            }
          })
        })

        //Added for group start
        this.data.map((add) => {
          this.vendorAddress.map((ord) => {
            if (ord._id == add.address) {
              add.address = ord.address
            }
          })
        })

        this.data.filter((da) => {
          var date = new Date(da.bookingDate);
          var monYear = (date.toString().split(" ")[1] + "-" + date.toString().split(" ")[3])
          if (monYear == currentDate) {
            this.groupData.push(da);
          }
        })
        //end
        this.vendorOrders.map((x: any) => {
          var d1 = new Date(x.bookingDate);
          var d2 = (d1.toString().split(" ")[2] + "-" + d1.toString().split(" ")[1] + "-" + d1.toString().split(" ")[3])
          this.reportData.push({ name: d2, y: Number(x.newPrice) })
        })

        this.vendorOrders.filter((da) => {
          var date = new Date(da.bookingDate);
          var monYear = (date.toString().split(" ")[1] + "-" + date.toString().split(" ")[3])
          // console.log("zz",this.data,"monYear",monYear)
          if (monYear == currentDate) {
            this.tabularData.push(da);
          }
        })
        this.reportData.filter((da) => {
          var date = new Date(da.name);
          var monYear = (date.toString().split(" ")[1] + "-" + date.toString().split(" ")[3])
          if (monYear == currentDate) {
            this.monthlyReportData.push(da);
          }
        })
        console.log("monthlyReportData", this.monthlyReportData)
        this.options.series.push({ name: "Order", data: this.monthlyReportData })
        if (!this.custom) {
          Highcharts.chart('container', this.options);
        }
      }, (error) => {
        console.log('error is ', error)
      });
    }, (error) => {
      console.log('error is ', error)
    })
    //}, 1000)
    //setTimeout(() => {

    // }, 1000);
  }

  toolbarClick(args: ClickEventArgs): void {
    console.log("argsargs",args.item,"valuessssssss",this.grid)
    if (args.item.id === 'orderreport_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
    console.log("jjjjjjjjjjsssssss")  
    this.grid.pdfExport();
    }
  }
  search(nameKey, myArray) {
    var mrpPrice = 0;
    var actPrice = 0;
    var perAvg = 0;
    var obj = [];
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
  mode(event) {
    if (event.custom == true) {
      setTimeout(function () {
        Highcharts.chart('container', event.options);
      }, 1000);

    }
  }
  getDate(event) {
    var date = event.value;
    var startDate = date.toString().split(",")[0];
    var endDate = date.toString().split(",")[1];
    this.monthlyReportData = [];
    //this.tabularData = []
    this.groupData = []
    if (this.custom) {
      // this.vendorOrders.filter((key) => {
      //   if (new Date(key.bookingDate) >= new Date(startDate) && new Date(key.bookingDate) <= new Date(endDate)) {
      //     this.tabularData.push(key);
      //     this.grid.refresh();
      //   }
      // })
      this.data.filter((key) => {
        if (new Date(key.bookingDate) >= new Date(startDate) && new Date(key.bookingDate) <= new Date(endDate)) {
          //this.tabularData.push(key);
          this.groupData.push(key);
          this.grid.refresh();
        }
      })
    }
    else {
      this.reportData.filter((fil) => {
        if (new Date(fil.name) >= new Date(startDate) && new Date(fil.name) <= new Date(endDate)) {
          var d1 = new Date(fil.name);
          date = (d1.toString().split(" ")[2] + "-" + d1.toString().split(" ")[1] + "-" + d1.toString().split(" ")[3])
          this.monthlyReportData.push({ name: date, y: fil.y })
        }
      })
      console.log("tabiu1111", this.tabularData)
      this.options.series = [];
      if (this.monthlyReportData.length > 0) {
        this.options.series.push({ name: "Order", data: this.monthlyReportData })
        if (!this.custom) {
          Highcharts.chart('container', this.options);
        }
      }
      else {
        this.options.series.push({ name: "Order", data: [] })
        if (!this.custom) {
          Highcharts.chart('container', this.options);
        }
      }
    }
  }
}
