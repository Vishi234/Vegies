import { Component, OnInit } from '@angular/core';
import { configList } from '../dashboard/configList.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../../login/login.service'
import { setAddress } from '../set-address/set-address.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
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
              //z= ord;//[...new Set(this.data.map(ord))];
            }
          })
          add.active=(Number(((new Date(add.bookingDate)).toISOString().split('T')[0]).replace(/-/g,''))>=Number(((new Date()).toISOString().split('T')[0]).replace(/-/g,'')))
        })  
        //this.vendorOrders=this.vendorOrders.slice(Math.max(this.vendorOrders.length - 8, 1))
        this.vendorOrders=this.vendorOrders.length>9?this.vendorOrders.slice(Math.max(this.vendorOrders.length - 8, 1)):this.vendorOrders
        console.log("vendororderssss",this.vendorOrders,"lengthhh",this.vendorOrders.length) 
      }, (error) => {
        console.log('error is ', error)
      });
    //}, 1000);
  }

  cancelOrder(orderId){
  console.log("orderID is _configList",orderId)
  this._configList.cancelOrder(orderId).subscribe((res: any) => {
    this._toastr.success(res.status)
    this.ngOnInit();
  }, (error) => {
    console.log('error is ', error)
  });
  }


}
