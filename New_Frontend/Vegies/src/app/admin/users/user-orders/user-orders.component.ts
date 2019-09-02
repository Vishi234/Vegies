import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { OrderDetailsComponent } from '../order-details/order-details.component'
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  public filterSettings: Object;
  public pageSettings: object;
  public data: Object = [];
  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.data = [
      {
        OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
        ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
      }]
  }
  ViewOrderDetails() {
    this.dialog.open(OrderDetailsComponent, { disableClose: true });
  }
}
