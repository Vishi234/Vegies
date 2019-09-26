import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  proceed() {
    if (document.getElementsByClassName("cofirmation-modal")[0].classList.contains("hide")) {
      document.getElementsByClassName("cofirmation-modal")[0].classList.remove("hide");
    }
    else {
      document.getElementsByClassName("cofirmation-modal")[0].classList.add("hide");
    }
  }
}
