import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfigurationwizardComponent } from '../../vendor/configurationwizard/configurationwizard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    this.dialog.open(ConfigurationwizardComponent, { disableClose: true })
  }

}
