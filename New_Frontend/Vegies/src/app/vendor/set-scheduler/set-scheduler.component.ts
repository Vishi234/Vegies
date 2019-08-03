import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-set-scheduler',
  templateUrl: './set-scheduler.component.html',
  styleUrls: ['./set-scheduler.component.scss']
})
export class SetSchedulerComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  public data: object[];
  public filterSettings: Object;
  public pageSettings: object;
  public startDate: Date = new Date("dd-MMM-yyyy");
  public endDate: Date = new Date("dd-MMM-yyyy");
  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: false, pageSize: 5 };
    this.data = [
      { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38, ShipCountry: 'France' },
      { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61, ShipCountry: ' Germany' },
      { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83, ShipCountry: 'Brazil' },
      { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34, ShipCountry: 'France' },
      { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3, ShipCountry: 'Belgium' },
      { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17, ShipCountry: 'Brazil' },
      { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98, ShipCountry: 'Switzerland' },
      { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33, ShipCountry: 'Switzerland' },
      { OrderID: 10256, CustomerID: 'SUPRD', Freight: 13.97, ShipCountry: 'Brazil' },
      { OrderID: 10257, CustomerID: 'WELLI', Freight: 14.23, ShipCountry: 'Venezuela' },
      { OrderID: 10258, CustomerID: 'VICTE', Freight: 18.33, ShipCountry: 'France' },
      { OrderID: 10259, CustomerID: 'WELLI', Freight: 28.13, ShipCountry: 'Brazil' },
      { OrderID: 10260, CustomerID: 'CHOPS', Freight: 48.34, ShipCountry: 'Switzerland' },
      { OrderID: 10261, CustomerID: 'SUPRD', Freight: 32.73, ShipCountry: ' Germany' },
      { OrderID: 10262, CustomerID: 'TOMSP', Freight: 12.31, ShipCountry: 'Switzerland' },
      { OrderID: 10263, CustomerID: 'VICTE', Freight: 23.77, ShipCountry: 'Brazil' },
      { OrderID: 10264, CustomerID: 'SUPRD', Freight: 43.47, ShipCountry: 'Venezuela' },
      { OrderID: 10265, CustomerID: 'CHOPS', Freight: 53.37, ShipCountry: 'Belgium' },
    ];
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
