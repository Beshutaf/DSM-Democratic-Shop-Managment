import { Component, Input } from "@angular/core"
import { Product } from "../product.model";
import { NavController } from "ionic-angular";
import { ListDetailsComponent } from "./list-details-component/list.details.component";
import { ListService } from "../list.service";
@Component({
    selector:"app-list",
    templateUrl:"./list.component.html"
})
export class listComponent{
    @Input() productDetail:Product;
    Liked:Boolean=false;
    constructor(private navCtrl:NavController,private listService:ListService){}
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

       }
       else{
        this.listService.likeProduct(this.productDetail);
    }
    this.Liked=!this.Liked;
    }
}