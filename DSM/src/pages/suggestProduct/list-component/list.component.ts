import { Component, Input, EventEmitter } from "@angular/core"
import { Product } from "../product.model";
import { NavController, ModalController, AlertController } from "ionic-angular";
import { ListDetailsComponent } from "./list-details-component/list.details.component";
import { ListService } from "../list.service";
import { ModalcommentPage } from "./modalcomment/modalcomment";
@Component({
    selector:"app-list",
    templateUrl:"./list.component.html"
})
export class listComponent{
    role:String="admin";
    @Input() productDetail:Product;
   commentsChanged= new EventEmitter<number>();

    Liked:Boolean=false;
    constructor(public modalCtrl:ModalController,private navCtrl:NavController,private listService:ListService,public alertCtrl: AlertController){}
    productDetails(){
        this.navCtrl.push(ListDetailsComponent,{
            name:this.productDetail.name,
            description:this.productDetail.description,
            id:this.productDetail._id,
            imageUrl:this.productDetail.imageUrl
        });
    }
    onLike(){
       
       if (this.productDetail.liked ==true)
       {
        this.listService.DisLikeProduct(this.productDetail);
       }
       else{
        this.listService.likeProduct(this.productDetail);
    }
    this.productDetail.liked=!this.productDetail.liked;
}
openCommentBox(){
  let modal = this.modalCtrl.create(ModalcommentPage,{id:this.productDetail._id});
  modal.present();
  modal.onDidDismiss(data => {
       this.productDetail.commentsNumber=data;
});

}
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
           data.amount
          }
        }
      ]
    });
    prompt.present();
  }
  setStatus(){
       let prompt = this.alertCtrl.create({
      title: 'Status',
      message: "Choose Status",
      inputs: [
        {
          name: 'Status',
          label:"ordered",
          value:"o",
          type:"radio"
        },
         {
          name: 'Status',
          label:"shipped",
          value:"s",
          type:"radio"
        },
         {
          name: 'Status',
          label:"dileverd",
          value:"d",
          type:"radio"
        }
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
           data.amount
          }
        }
      ]
    });
    prompt.present();
  }

}