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
import {Router} from '@angular/router';
@Component({
  selector: 'app-preview-checklist',
  templateUrl: './preview-checklist.component.html',
  styleUrls: ['./preview-checklist.component.scss']
})
export class PreviewChecklistComponent implements OnInit {
@Input() addressData:any;
  public myCheckList: any;
  public userDetails: any;
  public uniqueAddress:any;
  public vendorAddress:any;
  public isConfigureAddress:any;
  public fields: Object = { text: 'address', value: '_id' };
  @ViewChild('address', { static: true }) public grid;
  @ViewChild('select', { static: true }) select;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private _setAddress:setAddress, private _login: LoginService,private _formBuilder: FormBuilder, private _configList: configList,private _toastr:ToastrService,private _router:Router) { 
  }
  firstFormGroup: FormGroup;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.myCheckList = this.data.ChecklistData;
    this.userDetails=this.data.userDetails;
    console.log("jjjjjjjjjjjjjj",this.userDetails)
      var x=new Date();
      this._setAddress.getAddressList(this.userDetails).subscribe((response) => {      
        this.vendorAddress = response;
        this.vendorAddress=this.vendorAddress.map((val: any) => {
          return ({  "address": val.address ,"_id":val._id})
        })
        this.select.refresh();
        this.isConfigureAddress=this.vendorAddress.length>0?"Change":"Add"
      }, (error) => {
        console.log('error is ', error)
      });
  

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
      v.status="Pending",
      v.email=this.userDetails.email,
      delete v._id
    })
     console.log("finalDataa",this.myCheckList)
    this._configList.addProductList(this.myCheckList).subscribe((res) => {
      this._toastr.success(res.status);
      this.dialog.closeAll();
      this._router.navigate(['/orders']);
    }, (error) => {
      console.log('error is ', error)
    })
    }

}



