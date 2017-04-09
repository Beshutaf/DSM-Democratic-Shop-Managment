import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http,Headers, RequestOptions} from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/Rx';

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

    slideOneForm: FormGroup;

  constructor(public navCtrl: NavController,public http: Http,public  alertCtrl: AlertController,
                                                   public navParams: NavParams,public formBuilder:FormBuilder) {
    this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        fName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
         email: ['',Validators.required],
        password: ['',Validators.required],
                gen: ['',Validators.required],
                       authen: ['',Validators.required],
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
    uname : this.slideOneForm.value.name,
    fName : this.slideOneForm.value.fName,
    lName : this.slideOneForm.value.LName,  
    password : this.slideOneForm.value.password,
    email : this.slideOneForm.value.email,
    PhoneNo:this.slideOneForm.value.number,
    Gender:this.slideOneForm.value.gen,   
    authen:this.slideOneForm.value.authen
    };
    let options = new RequestOptions({ headers: headers });
    this.http
        .post('https://obscure-reef-53169.herokuapp.com/users', body, options)
        .map(res => res.json())
       .subscribe(
            data => {
                let alert = this.alertCtrl.create({
      title: "נרשם בהצלחה",
      subTitle:
        this.slideOneForm.value.name+"  נוצר המשתמש ",
      buttons: ['חזרה']
    });
       alert.present();
              console.log(data);
          //      this.navCtrl.push(HomePage);
            },
            
            err => {
  let alert = this.alertCtrl.create({
      title: 'הרשמת משתמש נכשלה!  '+this.slideOneForm.value.name,
      subTitle:
        'המשתמש המבוקש לא נוצר :יכול להיות כבר קיים בדוק את הנתונים',
      buttons: ['חזרה']
    });
       alert.present();
              console.log("ERROR!: ", err);

            }
        );

}
}
