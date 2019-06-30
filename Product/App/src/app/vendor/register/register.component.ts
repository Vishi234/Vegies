import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor( public dialog: MatDialog) {
    
   }
   closeDialog() {
    this.dialog.closeAll()
  }

  ngOnInit() {
  }

}
