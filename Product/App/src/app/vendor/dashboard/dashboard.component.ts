import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator ,MatSort} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {ActivatedRoute} from '@angular/router'
import { AdminCategoryService } from '../../admin/category/admin-category.service'
import { ConfigurationwizardComponent } from '../../vendor/configurationwizard/configurationwizard.component';
/*
Left menu options

1) Price fluctuation slider
2) Task Scheduler
3) Reporting
4) My Account
*/
export interface PeriodicElement {
  productId: number,
  productName: string;
  unitPrice: number,
  qty: number,
  unitMeasure: string,
  totalPrice: number,
  discount:number
}
const ELEMENT_DATA: PeriodicElement[]=[];
// const ELEMENT_DATA: PeriodicElement[] = [
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0,discount:0 },
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
//   { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0}
// ];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: Array<any> = [];
  displayedColumns: string[] = ['select', 'productName', 'unitPrice', 'qty','discount', 'unitMeasure','totalPrice'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.productId + 1}`;
  }
  constructor(public dialog: MatDialog,private route: ActivatedRoute,private _vendorDetails: AdminCategoryService) {

  }
 
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._vendorDetails.GetProductList().subscribe((response) => {
      console.log("testinggggggggggggg")
      Object.entries(response).forEach(
        ([key, value]) => {
          ELEMENT_DATA.push({"productName":value.productName,"unitPrice":value.price,"totalPrice":value.actualPrice,"productId":0,"discount":value.discount,"unitMeasure":value.unitMeasure,qty:5})
          console.log("productttttttttt",value)
        }
      );
    }, (error) => {
      console.log('error is ', error)
    });
    //if(+this.route.snapshot.paramMap.get('id')==1){
      this.dialog.open(ConfigurationwizardComponent,{disableClose:true});
    //}
  }
}
