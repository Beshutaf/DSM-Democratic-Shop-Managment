import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
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
public loginForm:any;
  // constructor(public  alertCtrl: AlertController) {}
  constructor(public navCtrl: NavController,public  alertCtrl: AlertController,private formBuilder: FormBuilder,_form:FormBuilder) {
   //    this.loginForm = this._form.group({
          // "name":["",Validator.required]


      // })
     /* this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });*/

  }
login() {
  /*  let alert = this.alertCtrl.create({
      title: 'Login faild!',
      subTitle: 'Login Faild , check login info and connection contact admin',
      buttons: ['OK']
    });
    alert.present();*/

    this.navCtrl.push(HomePage);
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/

}
