import { Component, OnInit } from '@angular/core';
import { configList } from '../dashboard/configList.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../../login/login.service'
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public userDetails: any;
  public data: any;
  public vendoeOrders: any
  constructor(private _configList: configList, private _toastr: ToastrService, private _login: LoginService) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this._configList.getOrderList(this.userDetails).subscribe((response) => {
        this.data = response;
        var obj = [];
        const unique = [...new Set(this.data.map(item => item.bookingDate))];
        function search(nameKey, myArray) {
          obj = [];
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].bookingDate === nameKey) {
              obj.push(myArray[i]);
            }
          }
          return obj;
        }
        this.vendoeOrders = unique.map((x) => {
          return search(x, this.data);
        })
        // var total = 0;
        // this.vendoeOrders.map((d) => {
        //   d.map((inr) => {
        //     total = total + inr.oldPrice
        //     console.log("totallllll", inr)
        //     console.log("ddddddd122", total)
        //   })
        // })
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000);

  }


}
