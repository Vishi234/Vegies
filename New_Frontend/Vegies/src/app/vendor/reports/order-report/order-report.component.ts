import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { dataBound } from '@syncfusion/ej2-grids';
import { configList } from '../../dashboard/configList.service'
import { LoginService } from '../../../login/login.service'
import { setAddress } from '../../set-address/set-address.service'
declare var require: any;
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
  public start: Date = new Date();
  public end: Date = new Date();
  public vendorOrders: any
  public vendorAddress: any
  public data: any = [];
  public userDetails: any;
  public reportData: any = [];
  public monthlyReportData: any = [];
  public tabularData: any = [];
  public options: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Daily Order History. , 2018'
    },
    subtitle: {
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
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
  constructor(private _configList: configList, private _login: LoginService, private _setAddress: setAddress) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    })
  }

  ngOnInit() {
    setTimeout((x) => {
      this._setAddress.getAddressList(this.userDetails).subscribe((response) => {
        this.vendorAddress = response;
        console.log("objjjjj3344", this.vendorAddress)
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000)
    setTimeout(() => {
      this._configList.getOrderList(this.userDetails).subscribe((response) => {
        this.data = response;

        var currentDate = new Date().toString().split(" ")[1] + "-" + new Date().toString().split(" ")[3]
        this.data.filter((da) => {
          var date = new Date(da.bookingDate);
          var monYear = (date.toString().split(" ")[1] + "-" + date.toString().split(" ")[3])
          if (monYear == currentDate) {
            this.tabularData.push(da);
          }
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
        this.vendorOrders = unique.map((x) => {
          var test = search(x, this.data);
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
        this.vendorOrders.map((x: any) => {
          this.reportData.push({ name: x.bookingDate, y: Number(x.newPrice) })
        })
        this.reportData.filter((da) => {
          var date = new Date(da.name);
          var monYear = (date.toString().split(" ")[1] + "-" + date.toString().split(" ")[3])
          if (monYear == currentDate) {
            this.monthlyReportData.push(da);
          }
        })
        this.options.series.push({ name: "Order", data: this.monthlyReportData })
        Highcharts.chart('container', this.options);
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000);
  }

  getDate(event) {
    var date = event.value;
    var startDate = date.toString().split(",")[0];
    var endDate = date.toString().split(",")[1];
    this.monthlyReportData = [];
    this.reportData.filter((fil) => {
      if (new Date(fil.name) >= new Date(startDate) && new Date(fil.name) <= new Date(endDate)) {
        this.monthlyReportData.push(fil)
      }
    })

    this.data.filter((tabularData)=>{
      if(new Date(tabularData.bookingDate) >= new Date(startDate) && new Date(tabularData.bookingDate) <= new Date(endDate)){
        this.tabularData.push(tabularData)
      }
    })
    this.options.series = [];
    if (this.monthlyReportData.length > 0) {
      this.options.series.push({ name: "Order", data: this.monthlyReportData })
      Highcharts.chart('container', this.options);
    }
    else {
      this.options.series.push({ name: "Order", data: [] })
      Highcharts.chart('container', this.options);
    }
  }

}
