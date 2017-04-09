import { Component, Input, OnInit } from "@angular/core"
import { Product } from "../../product.model";
import { NavController, NavParams } from "ionic-angular";
import { comments } from "./comments.model";
@Component({
    selector:"app-list-details",
    templateUrl:"./list.details.component.html"
})
export class ListDetailsComponent implements OnInit {
    name:string;
    description:string;
    comment:comments[]=[
        new comments("mustafa","nice product"),
        new comments("michel","not bad")
    ]
        ngOnInit(){
            
           this.name=this.navParams.get("name");
           this.description=this.navParams.get("description");
        }

    @Input() productDetail:Product;
    createComment(comment){
      this.comment.push(new comments( "mustafa", comment.value.comment));
    }
    constructor(private navCtrl:NavController,private navParams:NavParams){}
       
}