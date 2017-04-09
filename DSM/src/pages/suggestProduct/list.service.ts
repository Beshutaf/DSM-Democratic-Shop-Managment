import { Product } from "./product.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Http } from "@angular/http"
import { LoadingController, AlertController } from "ionic-angular";
@Injectable()
export class ListService {
        
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
    ,private alertCtrl: AlertController){}
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
              temp.push(new Product(product.name,product.description,product.imageUrl));       
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
  //adds products for the list and to the server
  addProduct(Product:Product){
        let loader = this.loadingController.create({
        content: "adding item"
    });  

      this.productDetails.push(Product);

      const obj = {name:Product.name,description:Product.description,imageUrl:'http://lorempixel.com/1920/1080/'}
       loader.present();
      this.http.post("https://obscure-reef-53169.herokuapp.com/suggest/addProduct",obj)
      .subscribe((response)=>{
          this.productChanged.emit(this.productDetails.slice())
           loader.dismiss();
      }),(err)=>{
          console.log("error");
      }
   
  }
}