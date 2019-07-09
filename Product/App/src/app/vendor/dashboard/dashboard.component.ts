import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfigurationwizardComponent } from '../../vendor/configurationwizard/configurationwizard.component';

export interface PeriodicElement {
  productId: number,
  productName: string;
  unitPrice: number,
  qty: number,
  unitMeasure: string,
  totalPrice: number,
  discount:number
}

const ELEMENT_DATA: PeriodicElement[] = [
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0,discount:0 },
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0},
  { productId: 1, productName: 'Hydrogen', unitPrice: 1.0079, qty: 0, unitMeasure: '0', totalPrice: 0 ,discount:0}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['select', 'productName', 'unitPrice', 'qty', 'unitMeasure','totalPrice','discount'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
  constructor(public dialog: MatDialog) {

  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    //this.dialog.open(ConfigurationwizardComponent);
  }
}
