import { Component, Input, OnInit } from "@angular/core"
import { Product } from "../../product.model";
import { NavController, NavParams } from "ionic-angular";

@Component({
    selector:"app-list-details",
    templateUrl:"./list.details.component.html",
    providers:[]
})
export class ListDetailsComponent implements OnInit {
    name:string;
    description:string;
    _id:string;
    imageUrl:string;

        ngOnInit(){
            
           this.name=this.navParams.get("name");
           this.description=this.navParams.get("description");
           this.imageUrl=this.navParams.get("imageUrl");
           
       
        }
     
  constructor(private navCtrl:NavController,private navParams:NavParams
    ){}
    @Input() productDetail:Product;

  
  
   
}