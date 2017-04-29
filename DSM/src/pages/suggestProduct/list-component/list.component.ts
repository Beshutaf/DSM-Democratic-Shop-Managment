import { Component, Input, EventEmitter } from "@angular/core"
import { Product } from "../product.model";
import { NavController, ModalController } from "ionic-angular";
import { ListDetailsComponent } from "./list-details-component/list.details.component";
import { ListService } from "../list.service";
import { ModalcommentPage } from "./modalcomment/modalcomment";
@Component({
    selector:"app-list",
    templateUrl:"./list.component.html"
})
export class listComponent{
    @Input() productDetail:Product;
   commentsChanged= new EventEmitter<number>();

    Liked:Boolean=false;
    constructor(public modalCtrl:ModalController,private navCtrl:NavController,private listService:ListService){}
    productDetails(){
        this.navCtrl.push(ListDetailsComponent,{
            name:this.productDetail.name,
            description:this.productDetail.description,
            id:this.productDetail._id
        });
    }
    onLike(){
       
       if (this.Liked ==true)
       {
        this.listService.DisLikeProduct(this.productDetail);
       }
       else{
        this.listService.likeProduct(this.productDetail);
    }
    this.Liked=!this.Liked;
}
openCommentBox(){
  let modal = this.modalCtrl.create(ModalcommentPage,{id:this.productDetail._id});
  modal.present();
  modal.onDidDismiss(data => {
       this.productDetail.commentsNumber=data;
});

}
}