import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../user-auth/login.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changeform: FormGroup;
  public userDetails: any;
  constructor(private _login: LoginService, private fb: FormBuilder, private _toastr: ToastrService, private router: Router) {
    this.changeform = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      retypePassword: ['', Validators.required]
    });
    this._login.user().subscribe(result => {
      this.userDetails = result;
    })
  }
  changePwd = {};
  ngOnInit() {
  }

  changePassword() {
    this.changeform.markAsTouched();
    if (this.changeform.invalid) {
      return false;
    }
    Object.assign(this.changePwd, this.userDetails)
    this._login.changePassword(this.changeform).subscribe((res) => {
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
