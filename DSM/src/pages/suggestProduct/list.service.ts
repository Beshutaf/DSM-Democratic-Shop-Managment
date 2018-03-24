import { Product } from "./product.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Http } from "@angular/http"
import * as io from 'socket.io-client';
import { LoadingController, AlertController } from "ionic-angular";

import { BASE_SERVER_URL } from '../../app/constants.ts';

@Injectable()
export class ListService {
    i=1;
       private socket;
        alerting(){
             let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: 'please check your internet connection',
            buttons: ['Dismiss']
          });
  alert.present();
        }

    //http for http requests loadingController for loading animation
    constructor(private http:Http,public loadingController: LoadingController
    ,private alertCtrl: AlertController){
      
         this.socket = io(BASE_SERVER_URL);
          this.socket.on('product', (productAdd) => {
            console.log("entered");
           const product =JSON.parse(productAdd);
               const productAddition = new Product(product.name,product.description,product.imageUrl,product.Likes,false,false);
               productAddition._id=product._id;
               console.log(productAdd._id);
            this.productDetails.push(productAddition);
           this.productChanged.emit(this.productDetails.slice())
        
         
    });
    this.socket.on('status',(statusDetails)=>{
       var details= JSON.parse(statusDetails);
       console.log(details.status);
        for(let p of this.productDetails){
            if(p._id===details.id){
                p.status=details.status;
            }
        }
        this.productChanged.emit(this.productDetails.slice());
    })
    this.socket.on('like',(Product)=>{
     
      for(let p of this.productDetails){
          if(p._id==Product.id){
              
              p.Likes=Product.likes;
          }
      }
        this.productChanged.emit(this.productDetails.slice());
    })
        this.socket.on('dislike',(Product)=>{
     
      for(let p of this.productDetails){
          if(p._id==Product.id){
              
              p.Likes=Product.likes;
          }
      }
        this.productChanged.emit(this.productDetails.slice());
    })
    }
//product changed for emitting the product when they are added
productChanged=new EventEmitter<Product[]>();

//the array that contains all the products
     private productDetails:Product[]=[]

//returns all the products from the server and sets the animation
  getProducts(){
     
       
        let loader = this.loadingController.create({
              content: "...טוען מוצרים"
        });
       loader.present();
       this.http.get(BASE_SERVER_URL + "/suggest/getallproducts").subscribe((response)=>{
           if(response.json().sucess===false){
                this.alerting();
              loader.dismiss();
           }
           else{
             const temp =[];
       for(let product of response.json()){
           let liked:boolean;
                if(product.likedUsers.indexOf(localStorage.getItem("UserN").replace(/"/g,""))>-1){
                    liked=true;
                }
                else
                    liked=false;
                 const productadding=new Product(product.name,product.description,product.imageUrl,product.Likes,liked,product.Accepted);
                 productadding.numberOfLikes=product.AmountOfLikes;
                 productadding._id=product._id;
                 productadding.commentsNumber=product.comments.length;
                 productadding.status=product.status;
                
              temp.push(productadding);       
            }
        this.productDetails=temp;
       
        this.productChanged.emit(this.productDetails.slice())
        loader.dismiss();
           }
      },(err)=>{
       this.alerting();
      loader.dismiss();
      })
      return this.productDetails.slice();
  }
  initializeArray(){
      
      
  }
  DisLikeProduct(Product:Product){
    Product.Likes--;
     this.http.post(BASE_SERVER_URL + "/suggest/dislikeProduct",{_id:Product._id,user:localStorage.getItem("UserN").replace(/"/g,"")})
     .subscribe((response)=>{
          this.socket.emit('dislike-product', {likes:Product.Likes,id:Product._id});  
     })
  }
  likeProduct(Product:Product){
    Product.Likes++;
   
     this.http.post(BASE_SERVER_URL + "/suggest/likeProduct",{_id:Product._id,user:localStorage.getItem("UserN").replace(/"/g,"")})
     .subscribe((response)=>{
          this.socket.emit('like-product', {likes:Product.Likes,id:Product._id});  
     })
  }
  //adds products for the list and to the server
  addProduct(Product:Product){
        let loader = this.loadingController.create({
        content: "...מוסיף מוצר"
    });  

     

      const obj = {name:Product.name,description:Product.description,imageUrl:Product.imageUrl,Likes:0,Accepted:false,status:Product.status}
       loader.present();
      this.http.post(BASE_SERVER_URL + "/suggest/addProduct",obj)
      .subscribe((response)=>{
          if(response.json().success===false)
          {
                 this.alerting();
              loader.dismiss();
          }
          else{

        
           Product._id=response.json().id;
           console.log(Product._id);
  this.socket.emit('add-product', JSON.stringify(Product));    
           let alert = this.alertCtrl.create({
            title: 'Product Was Added',
            subTitle: 'Product was added to the pending list waiting for admin\'s approval',
            buttons: ['Dismiss']
          });
          alert.present();
           loader.dismiss();
          }
      }),(err)=>{
          this.alerting();
          loader.dismiss();
      }
   
  }
  deleteProduct(id:String){
       let loader = this.loadingController.create({
              content: "...מוחק מוצר"
        });
       loader.present();
      this.http.post(BASE_SERVER_URL + "/suggest/deleteProduct",{id:id}).subscribe(()=>{
              this.productDetails.splice( this.productDetails.findIndex(x=>x._id===id),1);
         this.productChanged.emit(this.productDetails);
         loader.dismiss();
      },(err)=>{
         this.alerting();
              loader.dismiss();
      })
     

  }
  approve(id,amountoflikes){
      let index=this.productDetails.findIndex(x=>x._id===id);
      this.productDetails[index].Accepted=true;
      this.productDetails[index].numberOfLikes=amountoflikes;
       this.http.post(BASE_SERVER_URL + "/suggest/approve",{id,amountoflikes})
       .subscribe((response)=>{
        
       });
 
}
setStatus(id,status){
    this.http.post(BASE_SERVER_URL + "/suggest/setStatus",{id:id,status:status}).subscribe((response)=>{
        console.log(status);
         this.socket.emit('set-status', JSON.stringify({status:status,id:id}));    
    })
}
}
