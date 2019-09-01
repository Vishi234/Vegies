import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { dataBound } from '@syncfusion/ej2-grids';
import { configList } from '../../dashboard/configList.service'
import { LoginService } from '../../../login/login.service'
import {setAddress} from '../../set-address/set-address.service'
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
  public start: Date = new Date("10-Jul-2017");
  public end: Date = new Date("11-Aug-2017");
  public vendorOrders: any
  public vendorAddress: any
  public data: any = [];
  public userDetails: any;
  public reportData: any = [];
  public options: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Browser market shares. January, 2018'
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
          format: '{point.y:.1f}%'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data:this.reportData
        // data: [
        //   {
        //     name: "Chrome",
        //     y: 62.74,
        //     drilldown: "Chrome"
        //   },
        //   {
        //     name: "Firefox",
        //     y: 10.57,
        //     drilldown: "Firefox"
        //   },
        //   {
        //     name: "Internet Explorer",
        //     y: 7.23,
        //     drilldown: "Internet Explorer"
        //   },
        //   {
        //     name: "Safari",
        //     y: 5.58,
        //     drilldown: "Safari"
        //   },
        //   {
        //     name: "Edge",
        //     y: 4.02,
        //     drilldown: "Edge"
        //   },
        //   {
        //     name: "Opera",
        //     y: 1.92,
        //     drilldown: "Opera"
        //   },
        //   {
        //     name: "Other",
        //     y: 7.62,
        //     drilldown: null
        //   }
        // ]
      }
    ],
    
  }
  constructor(private _configList: configList, private _login: LoginService,private _setAddress:setAddress) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    })
  }

  ngOnInit() {
    setTimeout((x)=>{
      this._setAddress.getAddressList(this.userDetails).subscribe((response) => {      
        this.vendorAddress = response;
        console.log("objjjjj3344",this.vendorAddress)
      }, (error) => {
        console.log('error is ', error)
      });
    },1000)
   

    setTimeout(() => {
      this._configList.getOrderList(this.userDetails).subscribe((response) => {
        this.data = response;
        var obj = [];
        const unique = [...new Set(this.data.map(item => item.bookingDate))];
        function search(nameKey, myArray) {
          var mrpPrice = 0;
          var actPrice = 0;
          var perAvg = 0;
          obj = [];
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].bookingDate === nameKey) {
              mrpPrice=mrpPrice+Number(myArray[i].oldPrice);
              actPrice=actPrice+Number(myArray[i].newPrice);
              perAvg=perAvg+Number(myArray[i].discount);
              myArray[i].oldPrice=Number(mrpPrice).toFixed(2);
              myArray[i].newPrice=Number(actPrice).toFixed(2);                                     
              myArray[i].discount=Number(perAvg).toFixed(2)
              obj.push(myArray[i]);
            }
          }
          return obj;
        }
        this.vendorOrders = unique.map((x) => {
          var test= search(x, this.data);
          var cnt= test[test.length-1]["discount"]/test.length
          test[test.length-1]["discount"]=Number(cnt).toFixed(2)
          test[test.length-1]["count"]=test.length
          return test[test.length-1];
        });

       
        var z
      this.vendorOrders.map((add)=>{
         this.vendorAddress.map((ord)=>{
            if(ord._id==add.address){
              add.address=ord.address
              //z= ord;//[...new Set(this.data.map(ord))];
            }
          })
        })
        this.vendorOrders.map((x:any)=>{
          this.reportData.push({date:x.bookingDate,price:x.newPrice})
        })
        console.log("objjjjj11",this.reportData)
        this.options.series.push({
          data:this.reportData
        })
        Highcharts.chart('container', this.options);
        console.log("tttttt")
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000);

    // setTimeout(() => {
    //   Highcharts.chart('container', this.options);
    // }, 1000);
    // this.data = [
    //   { "name": "project1", "data": [50291, 7410, 2013, 2013, 524, 201] },
    //   { "name": "project2", "data": [1776995, 758630, 25633, 4120054, 24521, 2045] }
    // ];

    // this.data.forEach(element => {
    //   this.options.series.push
    //     ({
    //       name: element.name,
    //       data: element.data
    //     })

    // });


  }

}
