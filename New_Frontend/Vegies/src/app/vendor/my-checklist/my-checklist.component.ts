import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { configList } from '../dashboard/configList.service'
import { GridComponent } from '@syncfusion/ej2-angular-grids'
import { SetSchedulerComponent } from '../set-scheduler/set-scheduler.component'
import { LoginService } from '../../login/login.service'
import{ToastrService} from 'ngx-toastr'
import { ThrowStmt } from '@angular/compiler';
import {setScheduler} from '../set-scheduler/set-scheduler.service'

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
  public quantity: any=1;
  public myCheckList: any
  public userDetails: any;
  
  @ViewChild('old', { static: true }) public grid: GridComponent;
  constructor(public dialog: MatDialog, private _configList: configList, private _login: LoginService,private _toastr:ToastrService,private _setScheduler:setScheduler) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    }
    )
  }

  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.getProductList();
  }

  getProductList() {
    setTimeout(() => {
      console.log("fffff", this.userDetails)
      this._configList.getProductList(this.userDetails).subscribe((response) => {
        this.data = response;
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000)
  }

  openScheduler() {
    this.getScheduleList();
    console.log("yoyoooooooo",this.myCheckList)
    this.dialog.open(SetSchedulerComponent, { disableClose: true ,data:{
      "scheduleData":this.myCheckList
    }})
    //this.addScheduleList();
  }
  onChange(event: any) {
    this.quantity = event.target.value;
    var parentId = event.target.parentElement.parentElement;
    parentId.children[4].innerText = event.target.value * this.data[parentId.rowIndex]["oldPrice"];
    parentId.children[6].innerText = parentId.children[4].innerText - (parentId.children[4].innerText * parentId.children[5].innerText) / 100;
  };

  removeProduct(event: any) {
    var del;
    if (confirm("Are You Sure To Delete this Informations ?")) {
      var idx = this.grid.getSelectedRowIndexes();
      del = idx.map((e) => {
        return this.data[e]['_id']
      })
      this._configList.delete(del).subscribe((res:any) => {
        this._toastr.success(res.status)
        this.getProductList();
      }, (error) => {
        console.log('error is ', error)
      });
    }
  }
  sendRequirement() {
    var selectedRow = this.grid.getSelectedRowIndexes();
    var table = document.getElementsByTagName("table");
    this.myCheckList = selectedRow.map((e) => {
      this.data[e]["oldPrice"] = table[1].children[1].children[e].children[4].textContent;
      this.data[e]["newPrice"] = table[1].children[1].children[e].children[6].textContent;
      this.data[e]["Qnty"] = this.quantity;
      return this.data[e];
    })
    this.addConfigureList();
  }

  addConfigureList() {
    console.log("hiiiiiiiiiiiii");
    this._configList.addProductList(this.myCheckList).subscribe((res) => {
      this._toastr.success(res.status)
    }, (error) => {
      console.log('error is ', error)
    })
  }

  getScheduleList() {
    var selectedRow = this.grid.getSelectedRowIndexes();
    var table = document.getElementsByTagName("table");
    this.myCheckList = selectedRow.map((e) => {
      this.data[e]["oldPrice"] = table[1].children[1].children[e].children[4].textContent;
      this.data[e]["newPrice"] = table[1].children[1].children[e].children[6].textContent;
      this.data[e]["Qnty"] = this.quantity;//(this.quantity=='undefined')?1:
      return this.data[e];
    })
    
    // console.log("hiiiiiiiiiiiii",this.myCheckList);
    // this._setScheduler.addScheduler(this.myCheckList).subscribe((res) => {
    //   this._toastr.success(res.status)
    // }, (error) => {
    //   console.log('error is ', error)
    // })
  }

}

