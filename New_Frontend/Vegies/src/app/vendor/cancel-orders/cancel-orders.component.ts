import { Component, OnInit } from '@angular/core';
import { configList } from '../dashboard/configList.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../../login/login.service'
import { setAddress } from '../set-address/set-address.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-cancel-orders',
  templateUrl: './cancel-orders.component.html',
  styleUrls: ['./cancel-orders.component.scss']
})
export class CancelOrdersComponent implements OnInit {
  public userDetails: any;
  public data: any;
  public vendorOrders: any
  public vendorAddress: any
  public currentDate:any;
  public orderDate:any;
  constructor(private _configList: configList, private _toastr: ToastrService, private _setAddress: setAddress, private _login: LoginService, private route: ActivatedRoute) {
    this.userDetails = this.route.snapshot.data['userData'];
    this._setAddress.getAddressList(this.userDetails).subscribe((response) => {
      this.vendorAddress = response;
    }, (error) => {
      console.log('error is ', error)
    });
  }
  ngOnInit() {
    
    this._configList.getCancelOrder(this.userDetails).subscribe((response) => {
      this.data = response;
      console.log("-------------->",this.data)
      var obj = [];
      const unique = [...new Set(this.data.map(item => item.bookingDate))];
      console.log("booking date:",unique)
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
      this.currentDate= new Date();
      this.vendorOrders.map((add) => {
        this.vendorAddress.map((ord) => {
          if (ord._id == add.address) {
            add.address = ord.address
          }
        })
      })  
      this.vendorOrders=this.vendorOrders.length>9?this.vendorOrders.slice(Math.max(this.vendorOrders.length - 8, 1)):this.vendorOrders
    }, (error) => {
      console.log('error is ', error)
    });
  }

}
