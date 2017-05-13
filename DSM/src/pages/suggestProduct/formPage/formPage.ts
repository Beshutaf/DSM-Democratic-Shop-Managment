import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Product } from "../product.model";
import { ListService } from "../list.service";
import { Camera } from "ionic-native/dist/es5";
import { ActionSheetController, AlertController } from 'ionic-angular'

@Component({
  selector: 'page-form',
  templateUrl: 'formPage.html'
})
export class formPage {
    base64Image: string="data:image/jpeg;base64,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";
  
 
  constructor(public navCtrl: NavController,private listService:ListService,public actionSheetCtrl: ActionSheetController,private alertCtrl: AlertController) {

  }
  takePicture(){

 let actionSheet = this.actionSheetCtrl.create({
     title: 'Choose From',
     buttons: [
       {
         text: 'Camera',
         role: 'Camera',
         handler: () => {
           Camera.getPicture({
       encodingType: Camera.EncodingType.JPEG,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        correctOrientation:true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
         }
       },
       {
         text: 'Gallery',
         handler: () => {
          Camera.getPicture({
       sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
       encodingType: Camera.EncodingType.JPEG,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        correctOrientation:true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
         }
       }]})



   actionSheet.present();
    console.log("hi");
    
     

  }
  createTask(form :NgForm){
  if(this.base64Image===undefined || form.value.name===undefined || form.value.description===undefined){
       let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: 'please fill in all the fields',
            buttons: ['Dismiss']
          });
  alert.present();
  }
   this.listService.addProduct(new Product(form.value.name,form.value.description,this.base64Image,0,false));
 
   this.navCtrl.pop();
  }
  cancelButton(){
    this.navCtrl.pop();
  }

}
