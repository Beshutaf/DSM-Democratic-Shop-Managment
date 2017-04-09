import { Component, Input } from "@angular/core"
import { Product } from "../product.model";
import { NavController } from "ionic-angular";
import { ListDetailsComponent } from "./list-details-component/list.details.component";
@Component({
    selector:"app-list",
    templateUrl:"./list.component.html"
})
export class listComponent{
    @Input() productDetail:Product;
    constructor(private navCtrl:NavController){}
    productDetails(){
        this.navCtrl.push(ListDetailsComponent,{
            name:this.productDetail.name,
            description:this.productDetail.description
        });
    }
}