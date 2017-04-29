import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Product } from "../product.model";
import { ListService } from "../list.service";
import { Camera } from "ionic-native/dist/es5";
@Component({
  selector: 'page-form',
  templateUrl: 'formPage.html'
})
export class formPage {
    base64Image: string;
  
 
  constructor(public navCtrl: NavController,private listService:ListService) {

  }
  takePicture(){
    console.log("hi");
    
     Camera.getPicture({
       encodingType: Camera.EncodingType.JPEG,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1080,
        targetHeight: 1980,
        correctOrientation:true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });

  }
  createTask(form :NgForm){
  
   this.listService.addProduct(new Product(form.value.name,form.value.description,this.base64Image,0));
 
   this.navCtrl.pop();
  }
  cancelButton(){
    this.navCtrl.pop();
  }

}
