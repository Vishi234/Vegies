import { Component, OnInit } from '@angular/core';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router'
import { LoginService } from './login.service'
import { ToastrService } from 'ngx-toastr'
import { ChangePasswordComponent } from '../vendor/change-password/change-password.component'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser: any = {}
  remember:any;
  constructor(public dialog: MatDialog, private router: Router, private _login: LoginService, private _toastr: ToastrService, private cookie: CookieService) {
    if (this.cookie.get('remember')) {
      this.loginUser.email = this.cookie.get('email');
      this.loginUser.password = this.cookie.get('password');
      this.remember=this.cookie.get('remember');
    }
  }
  changeValue(event) {
    this.remember =event.checked;
  }

  visitorSignin() {
    this._login.vendorLogin(this.loginUser)
      .subscribe(
        res => {
          console.log("response is----->",res)
          if (res.msg) {
            if (res.loginAttemp < 1) {
              this.showChangePassModal();
            } else if (res.status == 401) {
              this.router.navigate(['/login']);
            } else if(res.userType==100){
              this.router.navigate(['/admin/user-orders']);
            }else{
              this.cookie.set('email',this.loginUser.email);
              this.cookie.set('password',this.loginUser.password);
              this.cookie.set('remember',this.remember);
              this.router.navigate(['/dashboard']);
              this._toastr.success(res.msg)
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
