import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http,Headers, RequestOptions} from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/Rx';

import { BASE_SERVER_URL } from 'constants'

/*
  Generated class for the CreateUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html'
})
export class CreateUserPage {
    auth = localStorage.getItem("authType").replace(/[@.,\/#!$%\^&\*" ;:{}=\_`~()]/g,"");
    slideOneForm: FormGroup;

  constructor(public navCtrl: NavController,public http: Http,public  alertCtrl: AlertController,
                                                   public navParams: NavParams,public formBuilder:FormBuilder) {
    this.slideOneForm = formBuilder.group({
      //  name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        fName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['',Validators.required],
        password: ['1234'],
        gen: ['',Validators.required],
        authen: ['R',Validators.required],
        number: ['',Validators.required]
   
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
  }
saveNewUser(){
   
 let headers = new Headers();

       headers.append('content-Type','application/json');
           let body = {
   // uname : this.slideOneForm.value.name,
    fName : this.slideOneForm.value.fName,
    lName : this.slideOneForm.value.lName,  
    password : this.slideOneForm.value.password,
    email : this.slideOneForm.value.email,
    PhoneNo:this.slideOneForm.value.number,
    Gender:this.slideOneForm.value.gen,   
    authen:this.slideOneForm.value.authen
    };
    let options = new RequestOptions({ headers: headers });
    this.http
        .post(BASE_SERVER_URL + '/users', body, options)
        .map(res => res.json())
       .subscribe(
            data => {
                let alert = this.alertCtrl.create({
      title: "נרשם בהצלחה",
      subTitle:
        this.slideOneForm.value.fName+"  נוצר המשתמש ",
      buttons: ['חזרה']
    });
       alert.present();
              console.log(data);
          //      this.navCtrl.push(HomePage);
            },
            
            err => {
  let alert = this.alertCtrl.create({
      title: 'הרשמת משתמש נכשלה!  '+this.slideOneForm.value.fName,
      subTitle:
        ' המשתמש לא נוצר : וודא כי זהו איימיל תקין. ואינו קיים ',
      buttons: ['חזרה']
    });
       alert.present();
              console.log("ERROR!: ", err);

            }
        );

}
checkAuth(){

  if(this.auth==='A')
     return true;
     else
     return false;

}
}
