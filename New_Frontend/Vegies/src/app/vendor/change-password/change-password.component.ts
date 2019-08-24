import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {LoginService} from '../../login/login.service'
import{ToastrService} from 'ngx-toastr'
import {Router} from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public userDetails: any;
  constructor(public dialog: MatDialog,private _login: LoginService,private _toastr:ToastrService,private router:Router) {
    this._login.user().subscribe(result => {
      this.userDetails = result;
    }
    )
   }
  changePwd={};
  ngOnInit() {
  }

  changePassword(){
    console.log("daaaaaaaaa",this.userDetails);
    Object.assign(this.changePwd,this.userDetails)
    console.log("changePwd",this.changePwd)
    this._login.changePassword(this.changePwd).subscribe((res)=>{
      if(res.error){
        this._toastr.error(res.error)
      }else{
        this.closeModal();
        console.log("changeeeeeee",res)
        this._toastr.success(res.status)
        this.router.navigate(['/dashboard']);
      }
    })
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
