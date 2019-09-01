import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SetAddressComponent } from '../set-address/set-address.component'
import {setAddress} from '../set-address/set-address.service'
import { LoginService } from '../../login/login.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { configList } from '../dashboard/configList.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-preview-checklist',
  templateUrl: './preview-checklist.component.html',
  styleUrls: ['./preview-checklist.component.scss']
})
export class PreviewChecklistComponent implements OnInit {
@Input() addressData:any
  public myCheckList: any;
  public userDetails: any;
  public uniqueAddress:any;
  public vendorAddress:any;
  public fields: Object = { text: 'address', value: '_id' };
  @ViewChild('address', { static: true }) public grid;
  @ViewChild('select', { static: true }) select;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private _setAddress:setAddress, private _login: LoginService,private _formBuilder: FormBuilder, private _configList: configList,private _toastr:ToastrService) { 
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    }
    )
  }
  firstFormGroup: FormGroup;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.myCheckList = this.data.ChecklistData;
    console.log("this.myCheckListthis.myCheckList",this.myCheckList);
    setTimeout(() => {
      var x=new Date();
      console.log("fffff111", Number(x));
      this._setAddress.getAddressList(this.userDetails).subscribe((response) => {      
        this.vendorAddress = response;
        this.vendorAddress=this.vendorAddress.map((val: any) => {
          return ({  "address": val.address ,"_id":val._id})
        })
        this.select.refresh();
        console.log("addssssssss1111",this.uniqueAddress);
      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000)

  }
  closeModal() {
    this.dialog.closeAll();
  }
  changeAddress() {
    let dialogRef  = this.dialog.open(SetAddressComponent, { disableClose: true })
    dialogRef.afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      })
  }
  getAddress(event){
    this.uniqueAddress=event.value;
  }
  purchaseOrder() {
    this.myCheckList.map(v => {
      v.address = this.uniqueAddress
      v.bookingDate=new Date();
      v.orderId="ORD"+Number(new Date());
      v.status="Pending"
      delete v._id
    })
     console.log("finalDataa",this.myCheckList)
    this._configList.addProductList(this.myCheckList).subscribe((res) => {
      this._toastr.success(res.status)
    }, (error) => {
      console.log('error is ', error)
    })
    }

}



