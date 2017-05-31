import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { formPage } from "./formPage/formPage";
import { Product } from "./product.model";
import { ListService } from "./list.service";
import {ActionSheetController} from"ionic-angular"

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html',
})
export class SuggestPage implements OnInit {
 sortBy:String;
ngOnInit(){
  
      this.productDetails = this.listService.getProducts();
      
      this.listService.productChanged.subscribe((products:Product[])=>{
        this.productDetails=products;
        for(let product of this.productDetails){
          console.log(product.liked);
        }
      })
    }


  productDetails:Product[]=[]
  constructor(public navCtrl: NavController,private listService:ListService,private actionSheetctrl:ActionSheetController,) {

  }
 doRefresh(refresher) {
    this.productDetails = this.listService.getProducts();
      this.listService.initializeArray();
      this.listService.productChanged.subscribe((products:Product[])=>{
        this.productDetails=products;
        
         
      },(err)=>{
    
      })
     refresher.complete();
 }

  openForm(){
    this.navCtrl.push(formPage)
    console.log("hi");
  }
  actionController(){
    let actionSheet = this.actionSheetctrl.create({
     title: 'מיין לפי',
     cssClass:"buttons",
     buttons: [
       {
         text:'מס ליקים',
         cssClass:"buttons",
         role:'sortByLikes',
         handler:()=>{
           this.sortBy="-Likes";
           console.log(this.sortBy);
         }
       },
       {
         text:'מס הערות',
         role:'sortByComments',
         cssClass:"buttons",
         handler:()=>{
        this.sortBy="-commentsNumber";
        console.log(this.sortBy);
         }
       }
       ,
       {
         text:'תאריך',
         role:'sortByDate',
         cssClass:"buttons",
         handler:()=>{
           this.sortBy="";
         }
       }
       ]});
       actionSheet.present();
  }

}

