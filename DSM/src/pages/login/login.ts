import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
//import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    submitAttempt: boolean = false;
 
  static get parameter(){
  return [];
}


    slideOneForm: FormGroup;

 // name:string;

  // constructor(public  alertCtrl: AlertController) {}
  constructor(public navCtrl: NavController,public  alertCtrl: AlertController,public formBuilder:FormBuilder) {

    this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
         password: ['',Validators.required],
    });

  }

 save() {
  let alert = this.alertCtrl.create({
      title: 'Login faild!',
      subTitle: 'Login Faild,'+this.slideOneForm.value.name
       +"you pass"+ this.slideOneForm.value.password+
        ' check login info and connection contact admin',
      buttons: ['OK']
    });
    alert.present();

    this.navCtrl.push(HomePage);
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/

}
