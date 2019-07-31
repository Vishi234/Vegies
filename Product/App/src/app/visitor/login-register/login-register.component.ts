import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../vendor/login/login.service'
import {Router} from '@angular/router'
import { RegisterService } from '../../vendor/register/register.service'
import {registerModel} from '../../vendor/register/registerModel'

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  loginUser={}
  registerUser = new registerModel(1,'','','','','',1,1,0);
  constructor(private _login:LoginService,private router:Router,public vendorRegis:RegisterService,) { }
  visitorSignin(){
    console.log("login-register")
    this._login.vendorLogin(this.loginUser)
    .subscribe(
      res=>{
        console.log("0000000000000000000000000",res.token)
        localStorage.setItem('token',res.token+" "+this.loginUser['email'])
        localStorage.setItem('user',this.loginUser['email'])
        this.router.navigate(['/vendor/dashboard',res.Attemp]);
      },
      err=>console.error(err)
    )
  }

  visitorSignup() {
    console.log("data",this.registerUser)
    this.vendorRegis.vendorRegistration(this.registerUser).subscribe(response => {
      localStorage.setItem('token',response.token)
      this.router.navigate(["/vendor/dashboard"]);
     // console.log("responsewwwwww",response.o)
    }, (error) => {
      console.log('error is-- ', error)
    })
  } 
  ngOnInit() {
  }

}
