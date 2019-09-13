
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { AdminCategoryService } from '../admin/category/admin-category.service'
import { LoginService } from '../login/login.service'
import { configurationwizard } from './configuration.service'
import { AppGlobals } from '../../app.global';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { configList } from '../dashboard/config-list.service'
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  toggle: boolean = false;
  items: Array<any> = [];
  selectedPro = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  toppings = new FormControl();

  public currentLogged: any
  public filterItems: any
  google: any;
  public subCatList: Array<any> = [];
  configList = {};
  userConfigList: any;
  filterSubCategory: Array<any> = [];
  public fields: Object = { text: 'subCatName', value: '_id' };
  @ViewChild('select', { static: true }) select;
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private router: Router, private _vendorDetails: AdminCategoryService, private _login: LoginService, private _configurationwizard: configurationwizard, private _global: AppGlobals, private _toastr: ToastrService) {

    this._login.user()
      .subscribe(
        data => this.currentLogged = data

      )
  }

  inreaseHeight() {
    this.toggle = !this.toggle;

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
  getProductById(id) {
    return this.items.find(x => x.id === id);
  }

  getAddress(address: string) {
    //this.selectedAddress = address;
    this.userConfigList = this.selectedPro.map((el) => {
      var o = Object.assign({}, el);
      o.address = address,
        o.userName = this.currentLogged._id
      return o;
    })
  }

  addConfigureList() {
    this._configurationwizard.AddConfigProduc(this.userConfigList).subscribe((res) => {
      this._toastr.success(res.status)
      this.closeModal()
      window.location.reload();
    }, (error) => {
      console.log('error is ', error)
    })
  }


  ngOnInit() {

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

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this._vendorDetails.GetSubCategoryList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.subCatList.push(value)
        }
      );
      // this.subCatList.map((val: any) => {
      //   return ({ "_id": val._id, "subCatName": val.subCatName })
      // })
    }, (error) => {
      console.log('error is ', error)
    });
    console.log("dasdas", this.subCatList)
  }



  change(event) {
    this.items = [];
    this.filterItems.map((x) => {
      if (x.subCat == event.itemData.subCatName) {
        this.items.push(x);
      }
    })
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

  carouselOptions = {
    margin: 25,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 2,
        nav: true,
        loop: false
      },
      1500: {
        items: 3,
        nav: true,
        loop: false
      }
    }
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
