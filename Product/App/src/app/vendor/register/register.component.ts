import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerUser={}
  constructor( public dialog: MatDialog) {
    
   }
   onSubmit(){
     console.log("data",this.registerUser)
   }
   closeDialog() {
    this.dialog.closeAll()
  }

  ngOnInit() {
  }

}
