import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { configList } from '../dashboard/configList.service'
import { GridComponent } from '@syncfusion/ej2-angular-grids'
import { SetSchedulerComponent } from '../set-scheduler/set-scheduler.component'
@Component({
  selector: 'app-my-checklist',
  templateUrl: './my-checklist.component.html',
  styleUrls: ['./my-checklist.component.scss']
})
export class MyChecklistComponent implements OnInit {
  public data: any;
  public filterSettings: Object;
  public pageSettings: object;
  public unitMeasure: any;
  public calcOldPrice: any;
  @ViewChild('old', { static: true }) public grid: GridComponent;
  constructor(public dialog: MatDialog,private _configList: configList) { }

  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this._configList.getProductList().subscribe((response) => {
      this.data = response;
    }, (error) => {
      console.log('error is ', error)
    });
  }
  openScheduler() {
    this.dialog.open(SetSchedulerComponent, { disableClose: true })
  }
  onChange(event: any) {
    debugger;
    var parentId = event.target.parentElement.parentElement;
    console.log("valueeeee", this.data[parentId.rowIndex]["oldPrice"])

    parentId.children[4].innerText = event.target.value * this.data[parentId.rowIndex]["oldPrice"];

    parentId.children[6].innerText = parentId.children[4].innerText - (parentId.children[4].innerText * parentId.children[5].innerText) / 100;

    console.log("Unit Measure", this.unitMeasure)
  };

  removeProduct(event: any) {
    var del;
    if (confirm("Are You Sure To Delete this Informations ?")) {
      var idx = this.grid.getSelectedRowIndexes();
      del = idx.map((e) => {
        return this.data[e]['_id']
      })
      this._configList.delete(del).subscribe((response) => {
        console.log("Save Successfully")
      }, (error) => {
        console.log('error is ', error)
      });
    }
  }
  sendRequirement() {
    debugger;
    const selectedRow = this.grid.getSelectedRowIndexes();
    var table = document.getElementsByTagName("table");
    selectedRow.forEach((e) => {
      this.data[e]["oldPrice"] = table[1].children[1].children[e].children[4].textContent;
    })

  }
}

