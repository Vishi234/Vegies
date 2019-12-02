import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { setAddress } from '../set-address/set-address.service'
import { LoginService } from '../../login/login.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  public userDetails: any
  public password: any
  public vendorAddress: any;
  public isConfigureAddress: any;
  public fields: Object = { text: 'address', value: '_id' };

  public imagePath;
  imgURL: any;
  public message: string;

  @ViewChild('select', { static: true }) select;
  constructor(private route: ActivatedRoute, private cookie: CookieService, private _setAddress: setAddress, private _login: LoginService, private _toastr: ToastrService, private router: Router) {
    this.userDetails = this.route.snapshot.data['userData'];
  }
  changePwd = {
  };
  ngOnInit() {
    this._setAddress.getAddressList(this.userDetails).subscribe((response) => {
      this.vendorAddress = response;
      this.vendorAddress = this.vendorAddress.map((val: any) => {
        return ({ "address": val.address, "_id": val._id })
      })
      console.log("addresssssss", this.vendorAddress)
    }, (error) => {
      console.log('error is ', error)
    });

  }
  updBasicInfo() {
    console.log("ooooo")
    this._login.updVendorInfo(this.userDetails).subscribe(res => {
      console.log("basic info response", res);
      this._toastr.success(res.msg)
    })
  }

  changePassword() {
    Object.assign(this.changePwd, this.userDetails)
    console.log("changePwdchangePwd------", this.changePwd)
    this._login.changePassword(this.changePwd).subscribe((res) => {
      if (res.err) {
        this._toastr.error(res.err)
      } else {
        this._toastr.success(res.status)
        this._login.logoutUser()
          .subscribe(
            data => { console.log(data); this.router.navigate(['/login']) },
            error => console.error(error)
          )
      }
    })
  }



  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
