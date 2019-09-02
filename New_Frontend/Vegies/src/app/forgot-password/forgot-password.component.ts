import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {LoginService} from '../login/login.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public dialog: MatDialog,private _login: LoginService, private _toastr: ToastrService) { }
  updPassword={}
  closeModal() {
    this.dialog.closeAll();
  }
  sendEmail(){
    this._login.forgetPassword(this.updPassword)
    .subscribe(
      res => {
        console.log("ooooo",res)
        if (res.successMsg) {
          this._toastr.success(res.successMsg)
        }
        else if(res.errorMsg)
          this._toastr.error(res.errorMsg)
      },
      err => this._toastr.error(err)
    )
  }
  ngOnInit() {
  }
  

}
