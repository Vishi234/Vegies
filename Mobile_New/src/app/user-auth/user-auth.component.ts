import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { LoginService } from './login.service'
import { RegisterService } from './register.service'
import { ToastrService } from 'ngx-toastr'
import { registerModel } from './registerModel';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  loginform: FormGroup;
  registerform: FormGroup;
  registerUser = new registerModel(1, '', '', '', '', '', 1, 1, 0);
  constructor(public vendorRegis: RegisterService, private fb: FormBuilder, private router: Router, private _login: LoginService, private _toastr: ToastrService) {
    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerform = this.fb.group({
      organisationName: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit() {
  }
  onLogin() {
    this.loginform.markAsTouched();
    if (this.loginform.invalid) {
      return false;
    }
    this._login.vendorLogin(this.loginform.value)
      .subscribe(
        res => {
          if (res.msg) {
            this._toastr.success(res.msg)
            if (res.loginAttemp <= 1) {
              //this.showChangePassModal();
              this.router.navigate(['dashboard']);
            } else {
              //this.router.navigate(['mobile/configuration']);
              this.router.navigate(['dashboard']);
            }
          }
          else
            this._toastr.error(res.message)
        },
        err => this._toastr.error(err)
      )
  }
  onRegister() {
    this.registerform.markAsTouched();
    if (this.registerform.controls.organisationName.invalid) {
      this._toastr.success("Invalid Organisation Name");
      return false;
    }
    if (this.registerform.controls.fullName.invalid) {
      this._toastr.success("Invalid Full Name");
      return false;
    }
    if (this.registerform.controls.email.invalid) {
      this._toastr.success("Invalid Email Address");
      return false;
    }
    if (this.registerform.controls.mobileNo.invalid) {
      this._toastr.success("Invalid Mobile No.");
      return false;
    }
   
    this.registerUser = new registerModel
      (
        1,
        this.registerform.value.organisationName,
        this.registerform.value.fullName,
        this.registerform.value.email,
        this.registerform.value.mobileNo,
        '',
        1,
        1,
        0
      )
    this.vendorRegis.vendorRegistration(this.registerUser).subscribe(response => {
      if (response.errmsg)
        this._toastr.error("Email id allready exist");
      this._toastr.success(response.status);
      this.router.navigate(["/mobile/login"]);
    }, (error) => {
      console.log('error is ', error.errmsg)
    })
  }
}
