import { Component, OnInit } from '@angular/core';
import {userList} from './userList.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public filterSettings: Object;
  public pageSettings: object;
  public data: any = [];
  constructor(private _userList:userList) { }

  ngOnInit() {

    this._userList.getUesrDetails().subscribe((response) => 
    {
      this.data=response;
      this.data.map((key)=>{
      key.mailVerify=key.loginAttemp>0?'Approved':'Pending'
      })
      console.log("ressssssssssss",this.data)
      //this.rowDataProduct = response;
      //this.productData=this.rowDataProduct
      }, (error) => {
      console.log('error is ', error)
      });


    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    // this.data = [
    //   {
    //     OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
    //     ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
    //     ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
    //   }]
  }

}
