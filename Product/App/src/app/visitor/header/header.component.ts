import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../../vendor/register/register.component';
import { LoginComponent } from '../../vendor/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  OpenRegisterModal() {
    this.dialog.open(RegisterComponent, { disableClose: true })
  }
  OpenLoginModal() {
    this.dialog.open(LoginComponent, { disableClose: true })
  }
  ngOnInit() {
  }
}
@Component({
  selector: 'vendor-register-dialog',
  templateUrl: '../../vendor/register/register.component.html',
})
export class VendorRegisterDialog { }
