import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SidenavService } from '../side-nav/sidenav.service';
import { MatSidenav } from '@angular/material';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  toggleActive: boolean = false;
  constructor(private sidenav: SidenavService) {
  }
  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
  }
  ngOnInit() {
  }

}
