import { Component, OnInit,ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SetAddressComponent } from '../set-address/set-address.component'
import {setAddress} from '../set-address/set-address.service'
import { LoginService } from '../../login/login.service'
@Component({
  selector: 'app-preview-checklist',
  templateUrl: './preview-checklist.component.html',
  styleUrls: ['./preview-checklist.component.scss']
})
export class PreviewChecklistComponent implements OnInit {
  public myCheckList: any;
  public userDetails: any;
  public uniqueAddress:any;
  public message:any;
  @ViewChild('address', { static: true }) public grid;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private _setAddress:setAddress, private _login: LoginService) { 
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    }
    )
  }

  ngOnInit() {
    this.myCheckList = this.data.ChecklistData;
    setTimeout(() => {
      console.log("fffff", this.userDetails)
      this._setAddress.getAddressList(this.userDetails).subscribe((response) => {
        console.log("addssssssss",response)
        this.uniqueAddress = response;
        //this.grid.refresh();
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
}



