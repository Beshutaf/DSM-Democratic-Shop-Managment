import { Component, Input } from '@angular/core';
import { Product } from "../../../suggestProduct/product.model";
import { ListService } from "../../../suggestProduct/list.service";
import { AlertController } from "ionic-angular";


@Component({
  selector: 'pending-item',
  templateUrl: 'pending-item.constructor.html'
})
export class PendingProductItem {
    
    @Input() productDetail: Product;
    constructor(private alertCtrl:AlertController,private listService:ListService){}
   deleteItem(){
    this.listService.deleteProduct(this.productDetail._id);

}
Approve(){
     let prompt = this.alertCtrl.create({
      title: 'Amount',
      message: "Enter Amount Of Likes",
      inputs: [
        {
          name: 'Amount',
          placeholder: 'Amount',
          type:"number"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
              console.log(data);
              var amountoflikes=+data.Amount;
              this.productDetail.numberOfLikes=amountoflikes;
            this.listService.approve(this.productDetail._id,amountoflikes);
          }
        }
      ]
    });
    prompt.present();
  
}
  
}
