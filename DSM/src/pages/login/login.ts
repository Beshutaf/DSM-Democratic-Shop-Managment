import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Http,Headers, RequestOptions} from '@angular/http';

import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
//import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import 'rxjs/Rx';/*
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
  constructor(public navCtrl: NavController,public http: Http,public  alertCtrl: AlertController,public formBuilder:FormBuilder) {






    this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
         password: ['',Validators.required],
    });

  }
 // ionViewDidLoad(){
save(){
 
      let headers = new Headers();
       headers.append('content-Type','application/json');
           let body = {
      uname : this.slideOneForm.value.name,
    //  email : "mustafaa@gmail.com",
      password : this.slideOneForm.value.password
        

    };
    let options = new RequestOptions({ headers: headers });
    this.http
        .post('https://obscure-reef-53169.herokuapp.com/users/login', body, options)
        .map(res => res.json())
       .subscribe(
            data => {
              console.log(data);
                this.navCtrl.push(HomePage);
            },
            err => {
  let alert = this.alertCtrl.create({
      title: 'Login faild!  '+this.slideOneForm.value.name,
      subTitle: 
 
        ' check login info and connection contact admin',
      buttons: ['OK']
    });
       alert.present();
              console.log("ERROR!: ", err);

            }
        );
   }

}
