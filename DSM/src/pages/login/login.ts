import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController, LoadingController, MenuController  } from 'ionic-angular';
import { User } from "../admin/user.model";
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/Rx';

import { BASE_SERVER_URL } from '../../app/constants.ts';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
    attempts=0;
   splash = true;
   temp="";
   
   ionViewDidLoad() {
        
   setTimeout(() => this.splash = false, 4000);
   if(localStorage.getItem("UserN")!==null)
              this.autologin();
  }

 login: FormGroup;
    submitAttempt: boolean = false;
    viewState='login';
  static get parameter(){
  return [];
}



    slideOneForm: FormGroup;
  constructor(   public menu: MenuController,public navCtrl: NavController,public http: Http,public loadingCtrl: LoadingController,public  alertCtrl: AlertController,public formBuilder:FormBuilder) {
    this.slideOneForm = formBuilder.group({
        name: ['',Validators.required],
         password: ['',Validators.required],
    });
  }
autologin(){

 let loader = this.loadingCtrl.create({
              content: "...התחברות אוטומטית "
            
  });

       loader.present();

       //-------------------------------------------------//
 let headers = new Headers();
       headers.append('content-Type','application/json');

       let body = {
      email: localStorage.getItem("UserN").replace(/[,\/#!$%\^&\*" ;:{}=\`~()]/g,""),//this.slideOneForm.value.name,
      password : localStorage.getItem("pass").replace(/[@.,\/#!$%\^&\*" ;:{}=\_`~()]/g,"")
    };
  let options = new RequestOptions({ headers: headers });
  this.http
        .post(BASE_SERVER_URL + '/users/autologin', body,options)
        .map(res => res.json())
       .subscribe(
            data => {
              console.log(data);      
                  loader.dismiss();               
                this.navCtrl.setRoot(HomePage);

            },
            err => { 
               loader.dismiss();});
    
}
test(){

    let headers = new Headers();
       headers.append('content-Type','application/json');

                let body = {
      email : this.slideOneForm.value.name,
      password : this.slideOneForm.value.password
    };
       let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
    this.http
        .post(BASE_SERVER_URL + '/users/cookie', body, options)
        .map(res => res.json())
       .subscribe(
            data => {
              console.log(data); },
            err => {}   );
}
save(){
    let loader = this.loadingCtrl.create({
              content: "...אנא המתן"
        });
       loader.present();
      let headers = new Headers();
       headers.append('content-Type','application/json');
    let body = {
      email : this.slideOneForm.value.name,
      password : this.slideOneForm.value.password
    };   
    let options = new RequestOptions({ headers: headers });
    this.http
        .post(BASE_SERVER_URL + '/users/login', body, options)
        .map(res => res.json())
       .subscribe(
            data => { console.log(data);   
                const useradding=new User(data.email,data.password,data.PhoneNo ,data.Gender 
                ,data.authen,data.fName,data._id,data.lName);
     
  localStorage.setItem("UserN", JSON.stringify(this.slideOneForm.value.name));//date
  localStorage.setItem("authType", JSON.stringify(data.authen));//date
  localStorage.setItem("pass", JSON.stringify(this.slideOneForm.value.password));//date
 localStorage.setItem("myUser", JSON.stringify(useradding));//date

 console.log("Type Auth: " + localStorage.getItem("authType") + "my user: "+localStorage.getItem("myUser"));
               this.navCtrl.setRoot(HomePage);
             
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
