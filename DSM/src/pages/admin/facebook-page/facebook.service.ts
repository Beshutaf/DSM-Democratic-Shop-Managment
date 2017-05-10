import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { FacebookModel } from "./facebook.model";

@Injectable()
export class FacebookService{
    facebooksChanged=new EventEmitter<FacebookModel[]>();
    homePageFacebook=new EventEmitter<FacebookModel[]>();
    facebooks:FacebookModel[]=[]
    constructor(private http:Http){}
    getallPosts():FacebookModel[]{
        this.http.get("https://graph.facebook.com/560493177341455/feed?access_token=1907017396244103|o0mUhEEnvgNFo5yGwzxHgeErk5A")
        .subscribe((data)=>{
            console.log(data.json());
            const array = data.json();
            for(let facebookpost of array.data){
            this.facebooks.push(new FacebookModel(facebookpost.message,facebookpost.id));
        
        }
            this.facebooksChanged.emit(this.facebooks.slice());
         
        })
        return this.facebooks.slice();
    }
}