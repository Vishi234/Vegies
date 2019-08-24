import { Component, OnInit } from '@angular/core';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router'
import { LoginService } from './login.service'
import { ToastrService } from 'ngx-toastr'
import { ChangePasswordComponent } from '../vendor/change-password/change-password.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private _login: LoginService, private _toastr: ToastrService) {
  }
  loginUser = {}

  visitorSignin() {
    console.log("login-register")
    this._login.vendorLogin(this.loginUser)
      .subscribe(
        res => {
          if (res.msg) {
            this._toastr.success(res.msg)
            if (res.loginAttemp <= 1) {
              this.showChangePassModal();
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
          else
            this._toastr.error(res.message)
        },
        err => this._toastr.error(err)
      )
  }

  showModal() {
    this.dialog.open(ForgotPasswordComponent, { disableClose: true });
  }

  showChangePassModal() {
    this.dialog.open(ChangePasswordComponent, { disableClose: true });
  }
  ngOnInit() {

  }

}
