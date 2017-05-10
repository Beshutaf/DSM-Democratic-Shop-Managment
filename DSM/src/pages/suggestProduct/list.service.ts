import { Product } from "./product.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Http } from "@angular/http"
import * as io from 'socket.io-client';
import { LoadingController, AlertController } from "ionic-angular";
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
      
         this.socket = io("https://obscure-reef-53169.herokuapp.com");
          this.socket.on('product', (productAdd) => {
            console.log("entered");
           const product =JSON.parse(productAdd);
               const productAddition = new Product(product.name,product.description,product.imageUrl,product.Likes,false);
               productAddition._id=product._id;
               console.log(productAdd._id);
            this.productDetails.push(productAddition);
           this.productChanged.emit(this.productDetails.slice())
        
         
    });
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
              content: "getting items"
        });
       loader.present();
       this.http.get("https://obscure-reef-53169.herokuapp.com/suggest/getallproducts").subscribe((response)=>{
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
                    liked=false
                 const productadding=new Product(product.name,product.description,product.imageUrl,product.Likes,liked);
                 productadding._id=product._id;
                 productadding.commentsNumber=product.comments.length;
                
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
     this.http.post("https://obscure-reef-53169.herokuapp.com/suggest/dislikeProduct",{_id:Product._id,user:localStorage.getItem("UserN").replace(/"/g,"")})
     .subscribe((response)=>{
          this.socket.emit('dislike-product', {likes:Product.Likes,id:Product._id});  
     })
  }
  likeProduct(Product:Product){
    Product.Likes++;
   
     this.http.post("https://obscure-reef-53169.herokuapp.com/suggest/likeProduct",{_id:Product._id,user:localStorage.getItem("UserN").replace(/"/g,"")})
     .subscribe((response)=>{
          this.socket.emit('like-product', {likes:Product.Likes,id:Product._id});  
     })
  }
  //adds products for the list and to the server
  addProduct(Product:Product){
        let loader = this.loadingController.create({
        content: "adding item"
    });  

     

      const obj = {name:Product.name,description:Product.description,imageUrl:Product.imageUrl,Likes:0}
       loader.present();
      this.http.post("https://obscure-reef-53169.herokuapp.com/suggest/addProduct",obj)
      .subscribe((response)=>{
           Product._id=response.json().id;
           console.log(Product._id);
  this.socket.emit('add-product', JSON.stringify(Product));    
         
           loader.dismiss();
      }),(err)=>{
          console.log("error");
      }
   
  }
}