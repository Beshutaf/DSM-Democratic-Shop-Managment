import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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

  // constructor(public  alertCtrl: AlertController) {}
  constructor(public navCtrl: NavController,public  alertCtrl: AlertController) {}
login() {
    let alert = this.alertCtrl.create({
      title: 'Login faild!',
      subTitle: 'Login Faild , check login info and connection contact admin',
      buttons: ['OK']
    });
    alert.present();
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/

}
