import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public filterSettings: Object;
  public pageSettings: object;
  public data: Object = [];
  public status: { [key: string]: Object }[] = [
    { name: "Pending", id: "0" },
    { name: "Confirmed", id: "1" },
    { name: "Dispatched", id: "2" },
    { name: "Shipped", id: "3" },
  ];
  public fields: Object = { text: 'name', value: 'id' };
  public text: string = "Select Status";
  public value: string = "0";
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
  Close() {
    this.dialog.closeAll();
  }
}
