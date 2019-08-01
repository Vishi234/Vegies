import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterService } from './register.service'
import { registerModel } from './registerModel';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor( public dialog: MatDialog,public vendorRegis:RegisterService,private router:Router) {
   }

   registerUser = new registerModel(1,'','','','','',1,1,0);

   vendorSignup() {
    console.log("data",this.registerUser)
    this.vendorRegis.vendorRegistration(this.registerUser).subscribe(response => {
      localStorage.setItem('token',response.token)
      this.router.navigate(["/admin/category"]);
      console.log("responsewwwwww",response.output.Result)
    }, (error) => {
      console.log('error is ', error)
    })
  } 

   closeDialog() {
    this.dialog.closeAll()
  }

  ngOnInit() {
  }

}
