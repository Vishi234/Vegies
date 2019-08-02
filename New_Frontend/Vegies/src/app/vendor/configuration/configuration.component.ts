///<reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { AdminCategoryService } from '../../admin/category/admin-category.service'
import {LoginService} from '../../login/login.service'
import {configurationwizard} from './configurationwizard.service'



@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit 
{
  toggle: boolean = false;
  items: Array<any> = [];
  selectedPro = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  toppings = new FormControl();
  toppingList=[] ;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public selectedAddress: PlaceResult;
  google: any;
  inreaseHeight() {
    this.toggle = !this.toggle;

  }
  onValChange(lbl, value) {
    if (value.length > 0) {
      document.getElementById("lblName" + lbl).innerHTML = "Selected";
      this.selectedPro.push(this.getProductById(lbl));
      console.log(this.selectedPro);
    }
    else {
      document.getElementById("lblName" + lbl).innerHTML = "Select Item";
      this.selectedPro=this.selectedPro.filter((pro:any)=>{
        if(pro.id!==lbl){
          return pro
        }
      })
    }
  }
  getProductById(id) {
    return this.items.find(x => x.id === id);
  }
  constructor(private _adminCategory: AdminCategoryService, public dialog: MatDialog, private _formBuilder: FormBuilder,private _vendorDetails: AdminCategoryService,private _login:LoginService,private _configurationwizard:configurationwizard) {
    this._vendorDetails.GetProductList().subscribe((response) => {
      Object.entries(response).forEach(
        ([key, value]) => {
          this.items.push({"name":value.productName,"oldPrice":value.price,"newPrice":value.actualPrice,"id":value._id,"subCat":value.subCatName,
          image: "http://localhost:8080/"+value.imageUrl})
        //  console.log("productttttttttt",value)
        }
      );
    }, (error) => {
      console.log('error is ', error)
    });

    
    
  }
  ngOnInit() {
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

    this._adminCategory.GetSubCategoryList().subscribe((response) => {

      Object.entries(response).forEach(
        ([key, value]) => {
          this.toppingList.push(value.subCatName);
        }
      )
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

  change(event)
  {
    var getSelectProduct = this.items.filter(function (item) 
    {
      if (item.subCat == event.source.value) {
        return true;
      }
    });
    (this.items).push(getSelectProduct);
    // if(event.isUserInput) {
    //   console.log(event.source.value, event.source.selected);
    // }
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
