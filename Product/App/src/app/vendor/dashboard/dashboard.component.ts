import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigurationwizardComponent } from '../../vendor/configurationwizard/configurationwizard.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  dataSource: any;
  columnDefs: any = [
    {
      fieldName: 'title',
      headerName: 'Item Name',
      width: 500,
    },
    {
      fieldName: 'module',
      headerName: 'Unit Price'
    },
    {
      fieldName: 'associatedWith',
      headerName: 'Quantity'
    },
    {
      fieldName: 'modifiedByOn',
      headerName: 'Unit Measure'
    },
    {
      fieldName: 'modifiedByOn',
      headerName: 'Total Price'
    },
    {
      fieldName: 'modifiedByOn',
      headerName: 'Action'
    },
    {
      width: 50,
      cellRenderer: () => {
        return '<span style="cursor:pointer" class="viewIcon"><center>' +
          '<i class="material-icons" title="copy">content_copy</i></center></span>';
      }
      //, onCellClicked: (row) => this.openDialog(row)
    }
  ];
  constructor(public dialog: MatDialog) {

  }
  ngOnInit() {
    this.loading = true;
    this.dataSource = { data: null, fields: this.columnDefs };
    this.loading = false;
    //this.dialog.open(ConfigurationwizardComponent, { disableClose: true })
    
  }

}
