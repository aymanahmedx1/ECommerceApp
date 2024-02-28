import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { LoadingServiceService } from './service/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ECommerceApp';
  loading: boolean = false;
  constructor(private _loading: LoadingServiceService) { }

  ngOnInit() {
    this.listenToLoading();
  }


  listenToLoading(): void {
    this._loading.loading
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
