import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vendor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{
  panelOpenState = true;
}
