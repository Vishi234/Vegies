import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
