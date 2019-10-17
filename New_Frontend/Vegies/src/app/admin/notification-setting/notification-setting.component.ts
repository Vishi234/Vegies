import { Component, OnInit , EventEmitter, Output } from '@angular/core';
import {NotificationsService} from './notification.service'
@Component({
  selector: 'app-notification-setting',
  templateUrl: './notification-setting.component.html',
  styleUrls: ['./notification-setting.component.scss']
})
export class NotificationSettingComponent implements OnInit {

  constructor(private _notificationService: NotificationsService) {
    this._notificationService.requestPermission();
   }

  ngOnInit() {
  }
  notify() {  
    let data: Array < any >= [];  
    data.push({  
        'title': '70 % off on fruits.',  
        'alertContent': 'This is First Alert -- By Vegies'  
    });  
    data.push({  
        'title': 'New Product is added in Product.',  
        'alertContent': 'This is Second Alert -- By Vegies'  
    });  
    data.push({  
        'title': 'Leave Application',  
        'alertContent': 'This is Third Alert -- By Vegies'  
    });  
    data.push({  
        'title': 'Approval',  
        'alertContent': 'This is Fourth Alert -- By Vegies'  
    });  
    data.push({  
        'title': 'To Do Task',  
        'alertContent': 'This is Fifth Alert -- By Vegies'  
    });  
    this._notificationService.generateNotification(data);  
}  
}
