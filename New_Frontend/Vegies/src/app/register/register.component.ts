import { Component, OnInit } from '@angular/core';
import { registerModel } from './registerModel';
import {Router} from '@angular/router';
import { RegisterService } from './register.service'
import{ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUser = new registerModel(1,'','','','','',1,1,0);
  constructor(public vendorRegis:RegisterService,private router:Router,private _toastr:ToastrService) { }
  vendorSignup() {
    console.log("data",this.registerUser)
    this.vendorRegis.vendorRegistration(this.registerUser).subscribe(response => {
      console.log("ooooooooooooooo",response)
      if(response.errmsg)
      this._toastr.error("Email id all ready exist");
      this._toastr.success(response.status);
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log('error is ', error.errmsg)
    })
  } 

  ngOnInit() {
  }

}
