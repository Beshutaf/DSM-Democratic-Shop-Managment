import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { formPage } from "./formPage/formPage";
import { Product } from "./product.model";
import { ListService } from "./list.service";

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})
export class SuggestPage implements OnInit {
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
  constructor(public navCtrl: NavController,private listService:ListService) {

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

}

