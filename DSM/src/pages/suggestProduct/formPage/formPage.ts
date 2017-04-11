import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Product } from "../product.model";
import { ListService } from "../list.service";
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-form',
  templateUrl: 'formPage.html'
})
export class formPage {
  
 
  constructor(public navCtrl: NavController,private listService:ListService) {

  }
  createTask(form :NgForm){
  
   this.listService.addProduct(new Product(form.value.name,form.value.description,"http://lorempixel.com/1920/1080/",0));
 
   this.navCtrl.pop();
  }
  cancelButton(){
    this.navCtrl.pop();
  }

}
