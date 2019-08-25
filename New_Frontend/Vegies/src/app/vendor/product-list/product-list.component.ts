import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AdminCategoryService } from '../../admin/category/admin-category.service'
import { AppGlobals } from '../../app.global';
import { LoginService } from '../../login/login.service'
import { configList } from '../dashboard/configList.service'
import {configurationwizard} from '../configuration/configurationwizard.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public catList: Array<any> = [];
  public subCatList: Array<any> = [];
  public productList: Array<any> = [];
  public userDetails: any;
  public configData: any;
  public uniqueProductList: Array<any> = [];
  public allProduct: Object[];
  public selectedPro : Array<any> = [];
  userConfigList: any;
  
  constructor(private _categoryList: AdminCategoryService, private _global: AppGlobals, public _login: LoginService, public _configList: configList, private _configurationwizard: configurationwizard, private _toastr: ToastrService, private router: Router) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
    })
  }

  addConfigureList() {
    this.userConfigList = this.selectedPro.map((el) => {
      var o = Object.assign({}, el);
      o.address = "test",
      o.userName = this.userDetails._id
      return o;
    })

    this._configurationwizard.AddConfigProduc(this.userConfigList).subscribe((res) => {
      this._toastr.success(res.status)
      this.router.navigate(['/mychecklist'])
    }, (error) => {
      console.log('error is ', error)
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this._configList.getProductList(this.userDetails).subscribe((response) => {
        this.configData = response;
        this.uniqueProductList = this.productList.filter((objFromA) => {
          return !this.configData.find((objFromB) => {
            return objFromA.id === objFromB.id
          })
        })
        this.allProduct = this.uniqueProductList;
        console.log("fffffffffgg11", this.productList)
        console.log("fffffffffgg22", this.configData)
        console.log("fffffffffgg33", this.userDetails)

      }, (error) => {
        console.log('error is ', error)
      });
    }, 1000);

    this._categoryList.GetCategoryList().subscribe((response) => {
      // debugger
      Object.entries(response).forEach(
        ([key, value]) => {
          this.catList.push(value);
        }
      );
    }, (error) => {
      console.log('error is ', error)
    });

    this._categoryList.GetSubCategoryList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.subCatList.push(value)
        }
      );
    }, (error) => {
      console.log('error is ', error)
    });

    this._categoryList.GetProductList().subscribe((response) => {
      console.log("fffffffffgg", this.configData)
      Object.entries(response).forEach(
        ([key, value]) => {
          this.productList.push({
            "name": value.productName + '(' + value.productAlias + ')', "oldPrice": value.price, "newPrice": value.actualPrice, "id": value._id,
            image: this._global.baseImgUrl + value.imageUrl, "discount": value.discount, "unitMeasure": value.unitMeasure, "Qnty": 1, "productAlias": value.productAlias, "subCat": value.subCatName
          })
        }
      );
    }, (error) => {
      console.log('error is ', error)
    });

  }

  onValChange(lbl,id) {
    if(lbl.checked){
      this.selectedPro.push(this.getProductById(id))
    }else{
      this.selectedPro = this.selectedPro.filter((pro: any) => {
            if (pro.id !== id) {
              return pro
            }
          })
    }
  }

  getProductById(id) {
    return this.uniqueProductList.find(x => x.id === id);
  }

  @ViewChild('catList', { static: true })
  public catObj: DropDownListComponent;

  @ViewChild('proList', { static: true })
  public proObj: AutoCompleteComponent;
  // define the JSON of data
  public catData: Object[] = this.catList;
  public subCatData: Object[] = this.subCatList;
  public productData: Object[] = this.productList;

  

  // maps the appropriate column to fields property
  public catfields: Object = { text: 'catName', value: '_id' };
  public subCatFields: Object = { text: 'subCatName', value: '_id' };
  public productFields: Object = { text: 'name', value: '_id' };
  public value: string = '0';
  //  public text: string = 'Select Category';

  onCategoryChange(event) {
    var getSelectedSubCat = this.subCatData.filter(function (item) {
    });
    this.subCatData = getSelectedSubCat;
  }
  onSubCatChange(event) {
    var getSelectedProduct = this.productData.filter(function (item) {
      //  if (item._id == event.itemData._id) { return true;  }
    });
    this.productData = getSelectedProduct;

    this.allProduct = this.allProduct.filter(function (item) {
      // if (item._id == event.itemData._id) {  return true; }
    });
  }
  onProductChange(event) {

    this.allProduct = this.allProduct.filter(function (item) {
      //  if (item._id == event.itemData._id) {  return true; }
    });

  }
  // define the JSON of data
  public proNameData: Object[] = this.productList;
  public profields: Object = { value: 'name' };
  public proWaterMark: string = 'Start typing to find product...';
  public onProChange(args: any): void {
    let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
    // make empty the input value when typed characters is 'null' in input element
    if (this.proObj.value === "null" || this.proObj.value === null || this.proObj.value === "") {
      valueEle.value = '';
    }
  }
}
