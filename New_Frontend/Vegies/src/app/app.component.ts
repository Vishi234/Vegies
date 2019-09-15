import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; 
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vegies';
  constructor(private bnIdle: BnNgIdleService,private router: Router) { // initiate it in your component constructor
    this.bnIdle.startWatching(60*60).subscribe((res) => {//300 means 5 minutes
      if(res) {
        this.router.navigate(['/login']);
      }
    })
  }
}
