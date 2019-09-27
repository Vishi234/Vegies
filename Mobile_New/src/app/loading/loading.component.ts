import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading: boolean;
  constructor(private loaderService: LoadingService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
   }

  ngOnInit() {
  }

}
