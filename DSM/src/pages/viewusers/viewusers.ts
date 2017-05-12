import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  AlertController ,LoadingController } from 'ionic-angular';
import { Http} from "@angular/http";
import { User } from "../user.model";

@Component({
  selector: 'page-viewusers',
  templateUrl: 'viewusers.html'
})
export class ViewusersPage {
  //public usersL: any[];
  usersL : User[] = [];
  nuser :User;
  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public loadingController :LoadingController,public alertCtrl: AlertController) {}
  ionViewDidLoad() {
    this.save();
    console.log('ionViewDidLoad EditPage');
  }
                Alert2(){
             let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: ' an error has occured ',
            buttons: ['OK']
          });
  alert.present();
        }

  save(){
        let loader = this.loadingController.create({
              content: "getting Contacts"
        });
       loader.present();
this.http.get('https://obscure-reef-53169.herokuapp.com/users').map(res =>{

return res.json();
}).subscribe(data => {
         const temp =[];
for(let user of data.user){
  const useradding=new User(user.uname,user.password,user.email ,user.PhoneNo ,user.Gender ,user.authen,user.fName );
  temp.push(useradding);   
}
this.usersL = temp;
return this.usersL;

},
err => {
  this.Alert2();
 });
 loader.dismiss();

  }
   
}
