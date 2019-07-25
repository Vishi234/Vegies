///<reference types="@types/googlemaps" />
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { AdminCategoryService } from '../../admin/category/admin-category.service'

@Component({
  selector: 'app-configurationwizard',
  templateUrl: './configurationwizard.component.html',
  styleUrls: ['./configurationwizard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigurationwizardComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public selectedAddress: PlaceResult;
  toggle: boolean = false;
  toppings = new FormControl();
  public subCatList: Array<any> = [];
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  items: Array<any> = [];
  selectedPro = [];
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
    }
  }
  getProductById(id) {
    return this.items.find(x => x.id === id);
  }
  constructor(private _vendorDetails: AdminCategoryService
    , public dialog: MatDialog) {
    this.items = [
      {
        name: "Everfresh Flowers",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000148_24-fresho-onion.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "1"

      },
      {
        name: "Festive Deer",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000159_25-fresho-potato.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "2"
      },
      {
        name: "Morning Greens",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000200_17-fresho-tomato-hybrid.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "3"
      },
      {
        name: "Bunch of Love",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000068_22-fresho-capsicum-green.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "4"
      },
      {
        name: "Blue Clear",
        image: "https://www.bigbasket.com/media/uploads/p/s/241600_5-tata-salt-salt-iodized.jpg",
        unit: " ",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "5"
      },
      {
        name: "Evening Clouds",
        image: "https://www.bigbasket.com/media/uploads/p/s/283426_2-india-gate-basmati-rice-feast-rozzana.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "6"
      },
      {
        name: "Fontains in Shadows",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000188_11-fresho-palak.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "7"
      },
      {
        name: "Kites in the Sky",
        image: "https://www.bigbasket.com/media/uploads/p/s/40026269_2-milkfood-rich-desi-ghee.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "8"
      },
      {
        name: "Sun Streak",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000668_12-fresho-cucumber-english.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "9"
      }
    ]
  }
  google: any;
  ngOnInit() {
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
    this.setCurrentPosition();

    this._vendorDetails.GetSubCategoryList().subscribe((response) => {
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
  closeWizard() {
    this.dialog.closeAll();
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



}
