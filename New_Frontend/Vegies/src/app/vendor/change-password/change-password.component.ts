import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginService } from '../../login/login.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public userDetails: any;
  constructor(public dialog: MatDialog, private _login: LoginService, private _toastr: ToastrService, private router: Router) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
    }
    )
  }
  changePwd = { };
  ngOnInit() {
  }

  changePassword() {
    Object.assign(this.changePwd, this.userDetails)
    this._login.changePassword(this.changePwd).subscribe((res) => {
      if (res.err) {
        this._toastr.error(res.err)
      } else {
        this.closeModal();
        this._toastr.success(res.status)
        this._login.logoutUser()
          .subscribe(
            data => { console.log(data); this.router.navigate(['/login']) },
            error => console.error(error)
          )
      }
    })
  }

  // pwdValidate(evnt) {
  //   if (this.changePwd.newPassword !== evnt.target.value && evnt.target.value)
  //     alert("Password and confirm password should be same")
  //     return false
  // }

  closeModal() {
    this.dialog.closeAll();
  }
}
