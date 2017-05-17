import { Component } from '@angular/core';
import { Product } from "../../suggestProduct/product.model";
import { NavController, ActionSheetController } from "ionic-angular";
import { ListService } from "../../suggestProduct/list.service";


@Component({
  selector: 'page-pendingproduct',
  templateUrl: 'pending-product.html'
})
export class PendingProductPage {

ngOnInit(){
  
      this.productDetails = this.listService.getProducts();
      
      this.listService.productChanged.subscribe((products:Product[])=>{
        this.productDetails=products;
      console.log(this.productDetails);
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

}