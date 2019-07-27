import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {LoginService} from './login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser={}
  constructor(private _login:LoginService,private router:Router) { }

  vendorSignin(){
    this._login.vendorLogin(this.loginUser)
    .subscribe(
      res=>{
        localStorage.setItem('token',res.token)
        this.router.navigate(['/admin/category']);
      },
      err=>console.error(err)
    )
  }
  ngOnInit() {
  }

}
