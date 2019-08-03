import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
