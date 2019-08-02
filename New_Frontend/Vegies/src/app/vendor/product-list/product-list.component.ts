import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  public value: string = '0';
  @ViewChild('catList', { static: true })
  public catObj: DropDownListComponent;

  @ViewChild('proList', { static: true })
  public proObj: AutoCompleteComponent;
  // define the JSON of data
  public catData: Object[] = [
    { key: '0', value: 'Select Category' },
    { key: 'Game1', value: 'American Football' },
    { key: 'Game2', value: 'Badminton' },
    { key: 'Game3', value: 'Basketball' },
    { key: 'Game4', value: 'Cricket' },
    { key: 'Game5', value: 'Football' },
    { key: 'Game6', value: 'Golf' },
    { key: 'Game7', value: 'Hockey' },
    { key: 'Game8', value: 'Rugby' },
    { key: 'Game9', value: 'Snooker' },
    { key: 'Game10', value: 'Tennis' }
  ];
  // maps the appropriate column to fields property
  public catfields: Object = { text: 'value', value: 'key' };

  // define the JSON of data
  public proNameData: Object[] = [
    { key: 'Game1', value: 'American Football' },
    { key: 'Game2', value: 'Badminton' },
    { key: 'Game3', value: 'Basketball' },
    { key: 'Game4', value: 'Cricket' },
    { key: 'Game5', value: 'Football' },
    { key: 'Game6', value: 'Golf' },
    { key: 'Game7', value: 'Hockey' },
    { key: 'Game8', value: 'Rugby' },
    { key: 'Game9', value: 'Snooker' },
    { key: 'Game10', value: 'Tennis' }
  ];
  // maps the appropriate column to fields property
  public profields: Object = { value: 'value' };
  public proWaterMark: string = 'Start typing...';
  public onProChange(args: any): void {
    let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
    // make empty the input value when typed characters is 'null' in input element
    if (this.proObj.value === "null" || this.proObj.value === null || this.proObj.value === "") {
      valueEle.value = '';
    }
  }
}
