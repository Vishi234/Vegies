///<reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { setAddress } from './set-address.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../../login/login.service'
@Component({
  selector: 'app-set-address',
  templateUrl: './set-address.component.html',
  styleUrls: ['./set-address.component.scss']
})
export class SetAddressComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude;
  public longitude;
  public vendorAddress: {};
  public userDetails: any;
  constructor(private dialogRef: MatDialogRef<SetAddressComponent>, private _setAddress: setAddress, private _toastr: ToastrService, private _login: LoginService) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    }
    )
  }
  @ViewChild('address', { static: true }) public address;
  @Output() public childEvent = new EventEmitter();
  ngOnInit() {
    this.zoom = 10;
    this.latitude = 28.7041;
    this.longitude = 77.1025;
    this.getLocation();
    this.setCurrentPosition();

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
  closeModal() {
    this.dialogRef.close();
  }
  saveAddress() {
    this.vendorAddress = { "address": this.address.nativeElement.value, "date": new Date(), "userId": this.userDetails._id };
    this._setAddress.addAddressList([this.vendorAddress]).subscribe((res) => {
      this._toastr.success(res.status)
      this.dialogRef.close();
      window.opener.location.reload();
    }, (error) => {
      console.log('error is ', error)
    })
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    let geocoder = new google.maps.Geocoder;
    let latlng = { lat: this.latitude, lng: this.longitude };
    let that = this;
    geocoder.geocode({ 'location': latlng }, function (results) {
      if (results[0]) {
        that.zoom = 11;
        console.log(results[0].formatted_address);
        document.getElementById("address").innerHTML=results[0].formatted_address
      } else {
        console.log('No results found');
      }
    });
  }
}
