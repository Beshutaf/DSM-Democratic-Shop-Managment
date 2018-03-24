import { Component, OnInit } from '@angular/core';
import { FacebookService } from "../admin/facebook-page/facebook.service";
import { LoadingController} from "ionic-angular";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {
  topFacebookPosts:{name,imageUrl,message,index}[]=[];

  ngOnInit(){

    this.facebookService.getPosts();
       let loader = this.loader.create({
              content: "...טוען פוסטים נבחרים"
        });
        loader.present();
    this.facebookService.facebookPostedChanged.subscribe((app)=>{
        this.topFacebookPosts=app;
        loader.dismiss();
    })
    this.topFacebookPosts=this.facebookService.facebookPosted;
  }
  constructor( private loader:LoadingController,private facebookService:FacebookService) {
    
  }
}
