import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { setAddress } from '../set-address/set-address.service'
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  public userDetails: any
  public password: any
  public vendorAddress: any;
  public isConfigureAddress:any;
    public fields: Object = { text: 'address', value: '_id' };
  @ViewChild('select', { static: true }) select;
  constructor(private route: ActivatedRoute, private cookie: CookieService,private _setAddress: setAddress) { 
    this.userDetails = this.route.snapshot.data['userData'];
    this.password = this.cookie.get('password');
  }

  ngOnInit() {
    this._setAddress.getAddressList(this.userDetails).subscribe((response) => {      
      this.vendorAddress = response;
      this.vendorAddress=this.vendorAddress.map((val: any) => {
        return ({  "address": val.address ,"_id":val._id})
      })
      console.log("addresssssss",this.vendorAddress)
    }, (error) => {
      console.log('error is ', error)
    });
  
  }
  
  pwdValidate(evnt){
    if(this.password!==evnt.target.value && evnt.target.value)
    alert("Password and confirm password should be same")
  }
}
