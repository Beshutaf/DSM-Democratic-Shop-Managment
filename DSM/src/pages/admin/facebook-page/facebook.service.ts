import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { FacebookModel } from "./facebook.model";

@Injectable()
export class FacebookService{
    facebookPosted:{name,imageUrl,message,index}[]=[];
    facebooksChanged=new EventEmitter<FacebookModel[]>();
    facebookPostedChanged=new EventEmitter<{name,imageUrl,message,index}[]>();
    homePageFacebook=new EventEmitter<FacebookModel[]>();
    facebooks:FacebookModel[]=[]
    constructor(private http:Http){}
    getallPosts():FacebookModel[]{
        this.http.get("https://graph.facebook.com/560493177341455/feed?fields=from,message&access_token=EAAbGbBZA7zocBAJetwTSJ1jWZANlnaOLOX2wuSE6qssQsSY3AIr7zoZChmZC0ZCTlvyvtLpYSIbJGo3ZABgZCWqIZC4usGjvZAF8tvFNgijqVCrZCpttev0pboUgULgnUZAx1PqDDuJ2EgrSOnZAovzbumBwZBDap6OLoGrbEOThW9pzD3wZDZD")
        .subscribe((data1)=>{
            
            console.log(data1.json());
            const array = data1.json();
            
            for(let facebookpost of array.data){
                
                
                this.http.get("https://graph.facebook.com/"+facebookpost.from.id+"?fields=picture&access_token=EAAbGbBZA7zocBAJetwTSJ1jWZANlnaOLOX2wuSE6qssQsSY3AIr7zoZChmZC0ZCTlvyvtLpYSIbJGo3ZABgZCWqIZC4usGjvZAF8tvFNgijqVCrZCpttev0pboUgULgnUZAx1PqDDuJ2EgrSOnZAovzbumBwZBDap6OLoGrbEOThW9pzD3wZDZD")
        .subscribe((data)=>{
            console.log(data.json());
            this.facebooks.push(new FacebookModel(facebookpost.message,facebookpost.id,facebookpost.from.name,data.json().picture.data.url));
            this.facebooksChanged.emit(this.facebooks.slice());
          })
        }
            
      
        })
        return this.facebooks;
    }
}