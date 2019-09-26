import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminCategoryService } from '../admin/category/admin-category.service'
import { LoginService } from '../user-auth/login.service'
import { configurationwizard } from './configuration.service'
import { AppGlobals } from '../app.global';
import { ToastrService } from 'ngx-toastr'
import { Tab, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  public subCatList: Array<any> = [];
  items: Array<any> = [];
  selectedPro = [];
  public filterItems: any
  constructor(private _vendorDetails: AdminCategoryService, private _global: AppGlobals, ) { }
  tabObj: Tab;

  ngOnInit() {
    let obj = {};
    this.tabObj = new Tab();
    this._vendorDetails.GetProductList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.items.push({
            "name": value.productName + '(' + value.productAlias + ')', "oldPrice": value.price, "newPrice": value.actualPrice, "id": value._id,
            image: this._global.baseImgUrl + value.imageUrl, "discount": value.discount, "unitMeasure": value.unitMeasure, "Qnty": 1, "productAlias": value.productAlias, "subCat": value.subCatName
          })
        }
      );
      this.filterItems = this.items
    }, (error) => {
      console.log('error is ', error)
    });
    this._vendorDetails.GetSubCategoryList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.subCatList.push(value)

          obj =
            {
              header: { 'text': value.subCatName },
              content: '#tab-content'
            }
          this.tabObj.items.push(obj);
          this.tabObj.refresh();
        }
      );
    }, (error) => {
      console.log('error is ', error)
    });
    this.tabObj.appendTo('#element');
    let that = this;
    this.tabObj.addEventListener("selected", function (event) {
      that.items = [];
      that.filterItems.map((x) => {
        if (x.subCat == event.selectedItem.innerText) {
          that.items.push(x);
        }
      })
    })
  }

  getProductById(id) {
    return this.items.find(x => x.id === id);
  }


  fetchSubCat(subCategory) {
    this.items = [];
    this.filterItems.map((x) => {
      if (x.subCat == subCategory) {
        this.items.push(x);
      }
    })
  }
  checksubCat($x) {
    console.log("x.value", this.fetchSubCat(this.subCatList[$x.index].subCatName));
  }
  onValChange(lbl, value) {

    if (value.length > 0) {
      document.getElementById("lblName" + lbl).innerHTML = "Selected";
      this.selectedPro.push(this.getProductById(lbl));
    }
    else {
      document.getElementById("lblName" + lbl).innerHTML = "Select";
      this.selectedPro = this.selectedPro.filter((pro: any) => {
        if (pro.id !== lbl) {
          return pro
        }
      })
    }
  }
}
