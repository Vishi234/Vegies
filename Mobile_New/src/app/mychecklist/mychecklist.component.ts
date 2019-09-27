import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mychecklist',
  templateUrl: './mychecklist.component.html',
  styleUrls: ['./mychecklist.component.scss']
})
export class MychecklistComponent implements OnInit {
  @ViewChild('search', { static: true }) input: ElementRef;
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }
  searchexpand() {
    this.cdRef.detectChanges();
    if (document.getElementsByClassName("add-search")[0].classList.contains("expand")) {
      document.getElementsByClassName("add-search")[0].classList.remove("expand");
    }
    else {
      document.getElementsByClassName("add-search")[0].classList.add("expand");
      this.input.nativeElement.focus();

    }
  }
  expandtotal() {
    if (document.getElementsByClassName("total-base")[0].classList.contains("totalexpand")) {
      document.getElementsByClassName("total-base")[0].classList.remove("totalexpand");
      document.getElementsByClassName("sub-total")[0].classList.remove("inc-height");
    }
    else {
      document.getElementsByClassName("total-base")[0].classList.add("totalexpand");
      document.getElementsByClassName("sub-total")[0].classList.add("inc-height");
    }
  }
  increment(evt, action) {
    if (action == "plus") {
      var a = parseInt(evt.target.previousSibling.innerText);
      if (a == 10) {
        alert("Quantity can't be greater than 10")
      }
      else {
        evt.target.previousSibling.innerText = a + 1;
      }

    }
    else {
      var a = parseInt(evt.target.nextSibling.innerText);
      if (a == 3) {
        alert("Quantity should be minimum 3.")
      }
      else {
        evt.target.nextSibling.innerText = a - 1;
      }

    }
  }
}
