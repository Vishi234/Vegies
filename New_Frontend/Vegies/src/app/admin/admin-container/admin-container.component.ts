import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {LoginService} from '../../login/login.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  public userDetails: any;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _login:LoginService,private router: Router, private route: ActivatedRoute) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    this.userDetails = this.route.snapshot.data['userData'];
    
  }
  ngOnInit() {
    this._login.user().subscribe(result => {
      this.userDetails = result;
      error => console.log("Error is", error);
  })
  setTimeout((x)=>{
    console.log("this.userDetailsthis.userDetails",this.userDetails)
  },1000)

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this._login.logoutUser()
      .subscribe(
        data => { console.log(data); this.router.navigate(['/login']) },
        error => console.error(error)
      )
  }

}
