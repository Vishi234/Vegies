import { Component, OnInit, ChangeDetectorRef, ViewChild,AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidenavService } from './sidenav.service';
import { MatSidenav } from '@angular/material';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent {
  @ViewChild('snav', { static: true }) public sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private sidenavService: SidenavService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  
}
