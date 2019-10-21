///<reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { AdminCategoryService } from '../../admin/category/admin-category.service'
import { LoginService } from '../../login/login.service'
import { configurationwizard } from './configurationwizard.service'
import { AppGlobals } from '../../app.global';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { configList } from '../dashboard/configList.service'
import { MAT_DIALOG_DATA } from '@angular/material';
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
  //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  public appearance = Appearance;
  public zoom: number;
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public selectedAddress: any;
  public currentLogged: any
  public filterItems: any
  google: any;
  public subCatList: Array<any> = [];
  configList = {};
  userConfigList: any;
  filterSubCategory: Array<any> = [];
  productName:any="";
  public fields: Object = { text: 'subCatName', value: '_id' };
  @ViewChild('select', { static: true }) select;
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private router: Router, private _vendorDetails: AdminCategoryService, private _login: LoginService, private _configurationwizard: configurationwizard, private _global: AppGlobals, private _toastr: ToastrService) {
    this.currentLogged = this.data
    console.log("currentLoggedcurrentLogged",this.currentLogged)
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
      document.getElementById("lblName" + lbl).innerHTML = "Select Item";
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
    this.selectedAddress = address;
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
     // if(response.status==401){
        //this.router.navigate(['/login']);
      //}else{
      Object.entries(response).forEach(
        ([key, value]) => {
          this.productName = value.product + ((value.productAlias != null) ? '(' + value.productAlias + ')' : "")
          this.items.push({
            "name": this.productName, "oldPrice": parseFloat(value.price).toFixed(2), "newPrice": parseFloat(value.actualPrice).toFixed(2), "id": value._id,
            image: this._global.baseImgUrl + value.imageUrl, "discount": value.discount, "unitMeasure": value.unitMeasure, "Qnty": 1, "productAlias": value.productAlias, "subCat": value.subCatName
          })
        }
      );
      this.filterItems = this.items
    //  }
    }, (error) => {
      console.log('error is ', error)
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
    this.setCurrentPosition();
    this._vendorDetails.GetSubCategoryList().subscribe((response) => {
      console.log("333333333333333",response)
      Object.entries(response).forEach(
        ([key, value]) => {
          this.subCatList.push(value)
        }
      );
      this.subCatList.map((val: any) => {
        return ({ "_id": val._id, "subCatName": val.subCatName })
      })
    }, (error) => {
      console.log('error is ', error)
    });
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  change(event) {
    this.items = [];
    this.filterItems.map((x) => {
      if (x.subCat == event.itemData.subCatName) {
        this.items.push(x);
      }
    })
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
    console.log("hiiiiiiii");
    this.dialog.closeAll();
  }
}
