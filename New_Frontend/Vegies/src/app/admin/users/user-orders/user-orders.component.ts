import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material'
import { OrderDetailsComponent } from '../order-details/order-details.component'
import { configList } from '../../../vendor/dashboard/configList.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../../../login/login.service'
import { setAddress } from '../../../vendor/set-address/set-address.service'
import { GridComponent, CommandModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids'
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  public filterSettings: Object;
  public pageSettings: object;
  //public data: Object = [];
  public userDetails: any;
  public data: any;
  public vendorOrders: any
  public vendorAddress: any
  @ViewChild('old', { static: false }) public grid: GridComponent;
  constructor(public dialog: MatDialog,private _configList: configList, private _toastr: ToastrService, private _setAddress: setAddress, private _login: LoginService) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    })
   }
  ngOnInit() {
    setTimeout((x) => {
      this._setAddress.getAddressList(this.userDetails).subscribe((response) => {
        this.vendorAddress = response;
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000)


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
              //z= ord;//[...new Set(this.data.map(ord))];
            }
          })
        })
        console.log("objjjjj11", this.vendorOrders)
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000);

    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    // this.data = [
    //   {
    //     OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
    //     ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
    //     ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
    //   }]
  }
  ViewOrderDetails(orderId:any) {
    console.log("orderisssssssss",this.vendorOrders.address)
     var  dialogRef=this.dialog.open(OrderDetailsComponent, {
      disableClose: true, data: {
        "orderId": orderId,
        "address":this.vendorOrders[0].address
      }
    })

    dialogRef.afterClosed()
      .subscribe(() => {
        this.grid.refresh();
      })

    //this.dialog.open(OrderDetailsComponent, { disableClose: true });
  }
}
