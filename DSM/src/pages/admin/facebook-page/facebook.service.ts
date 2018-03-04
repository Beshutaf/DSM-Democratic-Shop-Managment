import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { FacebookModel } from "./facebook.model";
import { LoadingController } from "ionic-angular";

import { BASE_SERVER_URL } from '../../../app/constants.ts';

@Injectable()
export class FacebookService{
    facebookPosted:{name,imageUrl,message,index}[]=[];
    facebooksChanged=new EventEmitter<FacebookModel[]>();
    facebookPostedChanged=new EventEmitter<{name,imageUrl,message,index}[]>();
    homePageFacebook=new EventEmitter<FacebookModel[]>();
    facebooks:FacebookModel[]=[]
    constructor(private loadingController:LoadingController,private http:Http){}
    getallPosts():FacebookModel[]{
          let loader = this.loadingController.create({
              content: "getting items"
        });
       loader.present();
        this.http.get(BASE_SERVER_URL + "/facebook/getAll").subscribe(()=>{

        })
        this.http.get("https://graph.facebook.com/560493177341455/feed?fields=from,message,permalink_url&access_token=EAACEdEose0cBANnyirEXfgeQXkExou8CE92rCVc2TmuIUeXvsGtmL1kWSwFBNjFXXlar4ZBiDctiiQfFMWDna90eqXBlb3QB9LcpKyQK8DVXQz8OYpXcswswhSpaWiMOv1eIvebQrxr9RmqQpRrZCtuuGKnsWnO0M8A3ZCbewZDZD")
        .subscribe((data1)=>{
            
            console.log(data1.json());
            const array = data1.json();
            
            for(let facebookpost of array.data){
                
                
                this.http.get("https://graph.facebook.com/"+facebookpost.from.id+"?fields=picture&access_token=https://graph.facebook.com/560493177341455/feed?fields=from,message,permalink_url&access_token=EAACEdEose0cBANnyirEXfgeQXkExou8CE92rCVc2TmuIUeXvsGtmL1kWSwFBNjFXXlar4ZBiDctiiQfFMWDna90eqXBlb3QB9LcpKyQK8DVXQz8OYpXcswswhSpaWiMOv1eIvebQrxr9RmqQpRrZCtuuGKnsWnO0M8A3ZCbewZDZD")
        .subscribe((data)=>{
            console.log(data.json());
            this.facebooks.push(new FacebookModel(facebookpost.message,facebookpost.id,facebookpost.from.name,facebookpost.permalink_url,data.json().picture.data.url));
            this.facebooksChanged.emit(this.facebooks.slice());
         
          })
        }
              loader.dismiss(); 
      
        })
        return this.facebooks;
    }
    addFacebook(facebook){
        
      return  this.http.post(BASE_SERVER_URL + "/facebook/addFacebook",facebook);
    }
    getPosts(){
        this.http.get(BASE_SERVER_URL + "/facebook/getAll").subscribe((Response)=>{
            var facebookPosts=Response.json();
            this.facebookPostedChanged.emit(facebookPosts);
        })
    }
}