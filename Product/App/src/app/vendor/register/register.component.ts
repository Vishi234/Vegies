import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterService } from './register.service'
import { registerModel } from './registerModel';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor( public dialog: MatDialog,public vendorRegis:RegisterService) {
   }
   registerUser = new registerModel(1,'','','','','',1,1,0);

   vendorSignup() {
    console.log("data",this.registerUser)
    this.vendorRegis.vendorRegistration(this.registerUser).subscribe(response => {
      // var result = Object.keys(response).map(function (key) {
      //   return [Number(key), response[key]];
      // });
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
