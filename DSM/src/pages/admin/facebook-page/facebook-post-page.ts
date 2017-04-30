import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { FacebookService } from "./facebook.service";
import { FacebookModel } from "./facebook.model";

@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook-post-page.html',
  providers:[]
})
export class FacebookPostPage implements OnInit {
    adding:boolean=true;
    facebookpending:{message,index}[]=[];
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
        addFacebook(message,index){
           let counter:number=0;
            for (let facebookMessage of this.facebookpending)
            {
                if(facebookMessage.index===index){
                    
                    this.adding=false;
                    break;
                }
                counter++;
            }
            console.log(this.facebookpending);
            if(this.adding===true)
           this.facebookpending.push({message:message,index:index});
           else{
            this.facebookpending.splice(counter,1);
           this.adding=true;
           }
        }
 facebookPost(){
    
}
}