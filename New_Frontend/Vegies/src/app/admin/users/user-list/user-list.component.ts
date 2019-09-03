import { Component, OnInit } from '@angular/core';
import { userList } from './userList.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public filterSettings: Object;
  public pageSettings: object;
  public data: any = [];
  constructor(private _userList: userList) { }

  ngOnInit() {

    this._userList.getUesrDetails().subscribe((response) => {
      this.data = response;
      this.data.map((key) => {
        key.mailVerify = key.loginAttemp > 0 ? 'Approved' : 'Pending'
      })
    }, (error) => {
      console.log('error is ', error)
    });
    this.filterSettings = { type: 'Menu' };
    this.pageSettings = { pageSizes: true, pageSize: 10 };
  }

}
