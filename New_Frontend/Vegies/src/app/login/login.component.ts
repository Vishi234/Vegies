import { Component, OnInit } from '@angular/core';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog} from '@angular/material';
import {Router} from '@angular/router'
import {LoginService} from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialog: MatDialog,private router:Router,private _login: LoginService) { }
  loginUser={}

  visitorSignin(){
    console.log("login-register")
    this._login.vendorLogin(this.loginUser)
    .subscribe(
      res=>{
        localStorage.setItem('token',res.token+" "+this.loginUser['email'])
        localStorage.setItem('user',this.loginUser['email'])
        this.router.navigate(['/dashboard']);
      },
      err=>console.error(err)
    )
  }


  showModal() {
    this.dialog.open(ForgotPasswordComponent, { disableClose: true });
  }
  ngOnInit() {

  }

}
