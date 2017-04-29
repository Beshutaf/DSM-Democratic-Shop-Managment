import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController,LoadingController  } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Http,Headers, RequestOptions} from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/Rx';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
 login: FormGroup;
    submitAttempt: boolean = false;
    viewState='login';
  static get parameter(){
  return [];
}


    slideOneForm: FormGroup;
  constructor(public navCtrl: NavController,public http: Http,public loadingCtrl: LoadingController,public  alertCtrl: AlertController,public formBuilder:FormBuilder) {
    this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
         password: ['',Validators.required],
    });
  }
save(){
 
    let loader = this.loadingCtrl.create({
              content: "Please wait ..."
        });
       loader.present();
 
      let headers = new Headers();
       headers.append('content-Type','application/json');
           let body = {
      uname : this.slideOneForm.value.name,
      password : this.slideOneForm.value.password
    };
    
    let options = new RequestOptions({ headers: headers });
    this.http
        .post('https://obscure-reef-53169.herokuapp.com/users/login', body, options)
        .map(res => res.json())
       .subscribe(
            data => {
              console.log(data);
                 
    //  retrievedData=retrievedData.replace(/[@.,\/#!$%\^&\*" ;:{}=\_`~()]/g,"");

this.slideOneForm.value.name = this.slideOneForm.value.name.replace(/[@.,\/#!$%\^&\*" ;:{}=\_`~()]/g,"");

   localStorage.setItem("UserN", JSON.stringify(this.slideOneForm.value.name));//date
   localStorage.setItem("authType", JSON.stringify(this.slideOneForm.value.authen));//date
    
                this.navCtrl.push(HomePage);
  loader.dismiss();
            },
            err => {
                loader.dismiss();
  let alert = this.alertCtrl.create({
      title: this.slideOneForm.value.name+'  הכניסה נכשלה ',
      subTitle: 
 
        '     בדוק את הנתונים בשנית, וודא שישנו חיבור לאינטרנט ',
      buttons: ['חזרה']
    });
       alert.present();
              console.log("ERROR!: ", err);
            }
        );
   }

}
