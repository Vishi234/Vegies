import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-new-subcategory',
  templateUrl: './new-subcategory.component.html',
  styleUrls: ['./new-subcategory.component.scss']
})
export class NewSubcategoryComponent implements OnInit {
  public fields: Object = { text: 'subCatName', value: '_id' };
  public subCatList: Array<any> = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
