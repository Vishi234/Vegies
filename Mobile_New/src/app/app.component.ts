import { Component} from '@angular/core';
import { slideInAnimation } from './route-animation';
import { Routes, RouterModule,RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // animations: [slideInAnimation]
})
export class AppComponent {
  title = 'vegies';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
