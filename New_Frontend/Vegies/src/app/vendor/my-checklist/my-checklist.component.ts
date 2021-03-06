import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { configList } from '../dashboard/configList.service'
import { GridComponent } from '@syncfusion/ej2-angular-grids'
import { SetSchedulerComponent } from '../set-scheduler/set-scheduler.component'
import { PreviewChecklistComponent } from '../preview-checklist/preview-checklist.component'
import { LoginService } from '../../login/login.service'
import { ToastrService } from 'ngx-toastr'
import { ThrowStmt } from '@angular/compiler';
import { setScheduler } from '../set-scheduler/set-scheduler.service'
import { ActivatedRoute } from '@angular/router'
import { SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';

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
  public quantity: any =[];
  public myCheckList: any
  public userDetails: any;
  public selectedRow: any;
  public oldPrice:any=[];
  public newPrice:any=[];
  public totalMRP:any=0;
  public totalActualValue:any=0;
  public totalDiscount:any=0;
  public vendorAddress: any;
  public selectionOptions: SelectionSettingsModel;
  @ViewChild('old', { static: true }) public grid: GridComponent;
  constructor(public dialog: MatDialog, private _configList: configList, private _login: LoginService, private _toastr: ToastrService, private _setScheduler: setScheduler, private route: ActivatedRoute) {
    this.userDetails = this.route.snapshot.data['userData'];
    this.getProductList();
  }

  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
    //selectionSettings.checkboxOnly 
    this.selectionOptions = { checkboxOnly: true};
    this.pageSettings = { pageSizes: true, pageSize: 10 };
  }

  getProductList() {
      this._configList.getProductList(this.userDetails).subscribe((response) => {
        this.data = response;
        this.data.map((val)=>{
          val.unitMeasure='KG'
        })
        console.log("daaaaaaaa",this.data)
      }, (error) => {
        console.log('error is ', error)
      });
  }

  openScheduler() {
    if(this.getScheduleList()==undefined){
      this.dialog.open(SetSchedulerComponent, {
        disableClose: true, data: {
          "scheduleData": this.myCheckList,
          "userDetails":this.userDetails
        }
      })
  }
    //this.addScheduleList();
  }
  onChange(event: any) {
    var parentId = event.target.parentElement.parentElement;
    if(event.target.value<1){
    alert("Quantity should be greater than 1")
    this.data[parentId.rowIndex]["Qnty"]=1;
    this.getProductList();
    }else if(Number(event.target.value)>50){
      alert("Quantity should be less than equal to 50");
      this.data[parentId.rowIndex]["Qnty"]=1;
      this.getProductList();
    }else{
    this.quantity[this.grid.selectedRowIndex]= event.target.value;
    console.log("changesss is",this.grid.selectedRowIndex)
    if(this.grid.selectedRowIndex>=0){
      parentId.children[4].innerText = (event.target.value * this.data[parentId.rowIndex]["oldPrice"]).toFixed(2);
      parentId.children[6].innerText = (parentId.children[4].innerText - (parentId.children[4].innerText * parentId.children[5].innerText) / 100).toFixed(2);
  
      this.oldPrice[this.grid.selectedRowIndex]=parentId.children[4].innerText;
      this.newPrice[this.grid.selectedRowIndex]=parentId.children[6].innerText;
      //this.oldPrice[this.grid.selectedRowIndex] = (event.target.value * this.data[parentId.rowIndex]["oldPrice"]).toFixed(2);
      //this.newPrice[this.grid.selectedRowIndex] = (this.oldPrice[this.grid.selectedRowIndex] - (this.oldPrice[this.grid.selectedRowIndex] * this.data[parentId.rowIndex]["discount"]) / 100).toFixed(2);
    }else{
      debugger
      alert("Please select checkbox first.");
      this.data[parentId.rowIndex]["Qnty"]=1;
      this.getProductList();
    }
    }
  };

  removeProduct(event: any) {
    var del;
    this.selectedRow = this.grid.getSelectedRowIndexes();
    if (this.selectedRow.length > 0) {
      if (confirm("Do you want to delete this item from the checklist?")) {
        del = this.selectedRow.map((e) => {
          return this.data[e]['_id']
        })
        this._configList.delete(del).subscribe((res: any) => {
          this._toastr.success(res.status);
          this.getProductList();
        }, (error) => {
          console.log('error is ', error)
        });
      }
    }
    else {
      alert("Please select items.");
      return false;
    }
  }
  sendRequirement() {
    debugger;
    this.selectedRow = this.grid.getSelectedRowIndexes();
    if (this.selectedRow.length > 0) {
      var table = document.getElementsByTagName("table");
      this.myCheckList = this.selectedRow.map((e) => {
        this.data[e]["oldPrice"] = (this.oldPrice[e])?this.oldPrice[e]:this.data[e]["oldPrice"];
        this.data[e]["newPrice"] = (this.newPrice[e])?this.newPrice[e]:this.data[e]["newPrice"];
        this.data[e]["Qnty"] = (this.quantity[e])?(this.quantity[e]):1;
        // this.totalMRP=this.totalMRP+this.data[e]["oldPrice"];
        // this.totalActualValue=this.totalActualValue+this.data[e]["newPrice"];
        // this.totalDiscount=this.totalDiscount+this.data[e]["discount"];
        return this.data[e];
      });
      console.log("configuration dataaaaaaaa",this.myCheckList)
      this.dialog.open(PreviewChecklistComponent,
        {
          disableClose: true,
          data: {
            "ChecklistData": this.myCheckList,
            "userDetails":this.userDetails
          }
        })
    }
    else {
      alert("Please select items to send requirement.");
      return false;
    }

  }

  getScheduleList() {
    this.selectedRow = this.grid.getSelectedRowIndexes();
    if (this.selectedRow.length > 0) {
      var table = document.getElementsByTagName("table");
      this.myCheckList = this.selectedRow.map((e) => {
        this.data[e]["oldPrice"] = (this.oldPrice[e])?this.oldPrice[e]:this.data[e]["oldPrice"];
        this.data[e]["newPrice"] = (this.newPrice[e])?this.newPrice[e]:this.data[e]["newPrice"];
        this.data[e]["Qnty"] = (this.quantity[e])?(this.quantity[e]):1;
        return this.data[e];
      })
    }
    else {
      alert("Please select items to schedule.");
      return false;
    }
  }

}

