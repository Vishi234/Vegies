import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
