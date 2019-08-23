import { Component, OnInit } from '@angular/core';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog} from '@angular/material';
import {Router} from '@angular/router'
import {LoginService} from './login.service'
import {ChangePasswordComponent} from '../vendor/change-password/change-password.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialog: MatDialog,private router:Router,private _login: LoginService) {
   }
  loginUser={}

  visitorSignin(){
    console.log("login-register")
    this._login.vendorLogin(this.loginUser)
    .subscribe(
      res=>{
        console.log("fffffffffffffffff",res);
        this.router.navigate(['/dashboard']);
      },
      err=>console.error("eeeeeeeeee",err)
    )
  }



  showModal() {
    this.dialog.open(ForgotPasswordComponent, { disableClose: true });
  }
  ngOnInit() {
    
  }

}
