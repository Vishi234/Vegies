import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginService } from '../login/login.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  public userDetails: any;
  constructor(public dialog: MatDialog, private _login: LoginService, private _toastr: ToastrService, private router: Router) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
    }
    )
  }
  changePwd = {};
  ngOnInit() {
  }

  changePassword() {
    Object.assign(this.changePwd, this.userDetails)
    console.log("changePwd", this.changePwd)
    this._login.changePassword(this.changePwd).subscribe((res) => {
      if (res.error) {
        this._toastr.error(res.error)
      } else {
        //this.closeModal();
        this._toastr.success(res.status)
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
