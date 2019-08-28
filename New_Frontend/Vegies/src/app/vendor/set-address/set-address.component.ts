///<reference types="@types/googlemaps" />
import { Component, OnInit,ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog ,MatDialogRef} from '@angular/material';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import {setAddress} from './set-address.service'
import { ToastrService } from 'ngx-toastr'
import {LoginService} from '../../login/login.service'
@Component({
  selector: 'app-set-address',
  templateUrl: './set-address.component.html',
  styleUrls: ['./set-address.component.scss']
})
export class SetAddressComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public vendorAddress:{};
  public userDetails: any;
  constructor(private dialogRef:MatDialogRef<SetAddressComponent>,private _setAddress:setAddress,private _toastr:ToastrService, private _login: LoginService) { 
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
    }
    )
  }
  @ViewChild('address', { static: true }) public address;
  @Output() public childEvent=new EventEmitter();
  ngOnInit() {
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
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
    this.childEvent.emit('hiiiiiii how');
    this.dialogRef.close();
  }
  saveAddress(){
    this.vendorAddress={"address":this.address.nativeElement.value,"date":new Date(),"userId":this.userDetails._id};
      console.log("hiiiiiiiiiiiii",this.address.nativeElement.value);
      
      this._setAddress.addAddressList([this.vendorAddress]).subscribe((res) => {
        this._toastr.success(res.status)
        window.opener.location.reload();
      }, (error) => {
        console.log('error is ', error)
      })
    }
}
