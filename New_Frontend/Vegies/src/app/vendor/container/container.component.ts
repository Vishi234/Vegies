import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LoginService } from '../../login/login.service'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../change-password/change-password.component'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class VendorContainerComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  currentUser: any;

  fillerContent = Array.from({ length: 50 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;
  constructor(private route: ActivatedRoute, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private _login: LoginService, private router: Router, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this._login.user()
    //   .subscribe(
    //     data => {this.currentUser = data; console.log("222222",this.currentUser)},
    //     error => this.router.navigate(['/login'])
    //   )
    this.currentUser=this.route.snapshot.data['userData'];
  }
  openChangeModal() {
    console.log("hiiiiiiii11")
    this.dialog.open(ChangePasswordComponent, { disableClose: true });
  }
  addName(data) {
    this.currentUser = data.username;
    console.log("data username", this.currentUser)
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this._login.user()
      .subscribe(
        data => {this.currentUser = data;console.log("1111111",this.currentUser)},
        error => this.router.navigate(['/login'])
      )
      
  }
  logout() {
    this._login.logoutUser()
      .subscribe(
        data => { console.log(data); this.router.navigate(['/login']) },
        error => console.error(error)
      )
  }
}
