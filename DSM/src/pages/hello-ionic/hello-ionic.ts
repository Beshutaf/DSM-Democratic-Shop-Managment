import { Component, OnInit } from '@angular/core';
import { FacebookService } from "../admin/facebook-page/facebook.service";
import { FacebookModel } from "../admin/facebook-page/facebook.model";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {
  topFacebookPosts:{name,imageUrl,message,index}[]=[];

  ngOnInit(){
    this.facebookService.facebookPostedChanged.subscribe((app)=>{
        this.topFacebookPosts=app;
    })
    this.topFacebookPosts=this.facebookService.facebookPosted;
  }
  constructor(private facebookService:FacebookService) {
    
  }
}
