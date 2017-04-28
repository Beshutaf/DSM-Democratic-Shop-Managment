import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { FacebookService } from "./facebook.service";
import { FacebookModel } from "./facebook.model";

@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook-post-page.html',
  providers:[FacebookService]
})
export class FacebookPostPage implements OnInit {
  
    facebook:FacebookModel[]=[];
    constructor(private navController:NavController,private facebookService:FacebookService){}
closePage(){
    this.navController.pop();
}
  ngOnInit(){

           this.facebook= this.facebookService.getallPosts();
           this.facebookService.facebooksChanged.subscribe((facebookArray)=>{
               this.facebook=facebookArray;
               console.log(this.facebook);
           })
        }
}