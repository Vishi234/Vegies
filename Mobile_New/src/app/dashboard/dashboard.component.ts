import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../side-nav/sidenav.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  toggleActive: boolean = false;
  constructor(private sidenav: SidenavService) { }

  ngOnInit() {
  }
  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    // if (document.getElementsByClassName("sidebar")[0].classList.contains("hide")) {
    //   document.getElementsByClassName("sidebar")[0].classList.remove("hide")
    // }
    // else {
    //   document.getElementsByClassName("sidebar")[0].classList.add("hide")
    // }
    this.sidenav.toggle();
  }
  expand() {
    document.getElementsByClassName("address-modal")[0].classList.add("inc-height-base");
    document.getElementsByClassName("add-modal-base")[0].classList.add("increase-height");
  }
  collapse() {
    document.getElementsByClassName("address-modal")[0].classList.remove("inc-height-base");
    document.getElementsByClassName("add-modal-base")[0].classList.remove("increase-height");
  }
}
