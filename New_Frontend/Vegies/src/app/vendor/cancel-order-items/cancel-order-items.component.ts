import { Component, OnInit } from '@angular/core';
import { configList } from '../dashboard/configList.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../../login/login.service'
import { setAddress } from '../set-address/set-address.service'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-cancel-order-items',
  templateUrl: './cancel-order-items.component.html',
  styleUrls: ['./cancel-order-items.component.scss']
})
export class CancelOrderItemsComponent implements OnInit {
  public orderDate: any;
  public userDetails: any;
  public data: any;
  public orderSummary: any;
  public filterSettings: Object;
  public pageSettings: object;
  constructor(private route: ActivatedRoute, private _configList: configList, private _toastr: ToastrService, private _login: LoginService) {
    this.userDetails = this.route.snapshot.data['userData'];
  }
  ngOnInit() {
    this.filterSettings = { type: 'Menu' };
        this.pageSettings = { pageSizes: true, pageSize: 10 };
        this.orderDate = this.route.snapshot.paramMap.get('id');
      //  setTimeout((a) => {
            this._configList.getCancelOrder(this.userDetails).subscribe((response) => {
                this.data = response;
                console.log("idddddddddddd",this.data)
               this.orderSummary= this.data.filter((x)=>{
                if(x.bookingDate==this.orderDate){
                    return x;
                }
            })
            console.log("daaaaa",this.orderSummary)
            })
       // }, 1000)

        console.log(this.data,"llllllll")

  }

}
