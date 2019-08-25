import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SetAddressComponent } from '../set-address/set-address.component'
@Component({
  selector: 'app-preview-checklist',
  templateUrl: './preview-checklist.component.html',
  styleUrls: ['./preview-checklist.component.scss']
})
export class PreviewChecklistComponent implements OnInit {

  public myCheckList: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.myCheckList = this.data.ChecklistData;

  }
  closeModal() {
    this.dialog.closeAll();
  }
  changeAddress() {
    this.dialog.open(SetAddressComponent, { disableClose: true })
  }
}



