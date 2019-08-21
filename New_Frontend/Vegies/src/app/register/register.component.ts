import { Component, OnInit } from '@angular/core';
import { registerModel } from './registerModel';
import {Router} from '@angular/router';
import { RegisterService } from './register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUser = new registerModel(1,'','','','','',1,1,0);
  constructor(public vendorRegis:RegisterService,private router:Router) { }
  vendorSignup() {
    console.log("data",this.registerUser)
    this.vendorRegis.vendorRegistration(this.registerUser).subscribe(response => {
      console.log("ooooooooooooooo",response)
      localStorage.setItem('token',response.token)
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log('error is ', error)
    })
  } 

  ngOnInit() {
  }

}
