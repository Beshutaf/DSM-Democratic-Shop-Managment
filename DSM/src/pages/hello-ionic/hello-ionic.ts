import { Component } from '@angular/core';
import { FacebookService } from "../admin/facebook-page/facebook.service";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private facebookService:FacebookService) {
    
  }
}
