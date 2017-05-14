import { Component, OnInit } from '@angular/core';
import { FacebookService } from "../admin/facebook-page/facebook.service";
import { FacebookModel } from "../admin/facebook-page/facebook.model";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {
  topFacebookPosts:FacebookModel[]=[];

  ngOnInit(){
    this.topFacebookPosts=this.facebookService.getallPosts();
  }
  constructor(private facebookService:FacebookService) {
    
  }
}
